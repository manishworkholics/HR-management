const Attendance = require('../models/attendance.model');
const User = require('../models/user.model');


exports.markAttendance = async (req, res) => {
    try {
        const { user_id, date, user_entry_time, user_exit_time } = req.body;

        const attendance = new Attendance({ user_id, date, user_entry_time, user_exit_time });
        await attendance.save();

        res.status(201).json({ message: 'Attendance recorded', attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ user_id: req.params.id });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getMonthlyAttendance = async (req, res) => {
    try {
        const { month, year } = req.params;
        const requestedMonth = parseInt(month);
        const requestedYear = parseInt(year);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (requestedYear > currentYear) {
            return res.status(400).json({ message: "Invalid request: Future data not available" });
        }
        if (requestedYear === currentYear && requestedMonth > currentMonth) {
            return res.status(400).json({ message: "Invalid request: Future data not available" });
        }
        const attendance = await Attendance.find({
            date: {
                $regex: `^${requestedYear}-${requestedMonth.toString().padStart(2, '0')}`
            }
        });

        res.status(200).json({ attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.getAllAttendance = async (req, res) => {
//     try {
//         const attendance = await Attendance.find();
//         res.json(attendance);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.aggregate([
            {
                $lookup: {
                    from: "users", // Reference to User collection
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Flatten user details
            },
            {
                $group: {
                    _id: "$date",
                    records: {
                        $push: {
                            user_id: "$user_id",
                            user_name: "$userDetails.name", // Get user name
                            user_entry_time: "$user_entry_time",
                            user_exit_time: "$user_exit_time",
                            status: "$status",
                            created_at: "$created_at",
                            updated_at: "$updated_at"
                        }
                    }
                }
            },
            { $sort: { _id: -1 } } // Sort by latest date
        ]);

        res.status(200).json(attendance);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getAllEmployeesForAttendance = async (req, res) => {
    try {
        const employees = await User.find().select('_id name username');
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Bulk Attendance Submission by Admin
exports.bulkAttendance = async (req, res) => {
    try {
        const { attendanceRecords } = req.body; // Array of { user_id, date, user_entry_time, user_exit_time }

        if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
            return res.status(400).json({ message: 'Invalid attendance data' });
        }

        const bulkOps = attendanceRecords.map(record => ({
            updateOne: {
                filter: { user_id: record.user_id, date: record.date },
                update: {
                    $set: {
                        user_entry_time: record.user_entry_time,
                        user_exit_time: record.user_exit_time,
                        status: record.status,
                        updated_at: new Date()
                    }
                },
                upsert: true
            }
        }));

        await Attendance.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Bulk attendance updated successfully' });
    } catch (error) {
        console.error('Bulk Attendance Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get attendance of a specific user
exports.getUserAttendance = async (req, res) => {
    try {
        const { id } = req.params;  // Extract user_id from params

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const attendanceRecords = await Attendance.find({ user_id: id })
            .populate('user_id', 'name email')  // Fetch user details
            .sort({ date: -1 });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this user" });
        }

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching user attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.calculateSalary = async (req, res) => {
    try {
        const { user_id } = req.params; // Extract user_id from request
        const { start_date, end_date } = req.query; // Get date filter from query params

        if (!user_id || !start_date || !end_date) {
            return res.status(400).json({ message: "User ID, Start Date, and End Date are required" });
        }

        // Find employee details
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch attendance records in the given date range
        const attendanceRecords = await Attendance.find({
            user_id,
            date: { $gte: start_date, $lte: end_date }
        });

        // Count the number of present days
        const presentDays = attendanceRecords.length; // Assuming each record is a present day

        // Calculate total salary
        const totalSalary = presentDays * user.wages_per_day;

        res.status(200).json({
            user_id: user._id,
            name: user.name,
            total_present_days: presentDays,
            wages_per_day: user.wages_per_day,
            total_salary: totalSalary,
            start_date,
            end_date
        });

    } catch (error) {
        console.error("Error calculating salary:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.getAllEmployeeSalaries = async (req, res) => {
//     try {
//         const { start_date, end_date } = req.query;

//         if (!start_date || !end_date) {
//             return res.status(400).json({ message: "Start Date and End Date are required" });
//         }

//         // Fetch all employees
//         const users = await User.find();

//         // Create an array to store salary details
//         const salaryDetails = [];

//         for (let user of users) {
//             // Fetch attendance records for the given date range where status is Present or WFH
//             const attendanceRecords = await Attendance.find({
//                 user_id: user._id,
//                 status: { $in: ["Present", "WorkFromHome"] },
//                 date: {
//                     $gte: new Date(start_date).toISOString().split("T")[0], 
//                     $lte: new Date(end_date).toISOString().split("T")[0] 
//                 }
//             });

//             // Count present days
//             const presentDays = attendanceRecords.length;

//             // Convert wages_per_day to number (if stored as string)
//             const wagesPerDay = parseFloat(user.wages_per_day);

//             // Calculate total salary
//             const totalSalary = presentDays * wagesPerDay;

//             // Store the salary details
//             salaryDetails.push({
//                 user_id: user._id,
//                 name: user.name,
//                 role: user.role,
//                 total_present_days: presentDays,
//                 wages_per_day: wagesPerDay,
//                 total_salary: totalSalary,
//                 start_date,
//                 end_date
//             });
//         }

//         res.status(200).json(salaryDetails);

//     } catch (error) {
//         console.error("Error fetching employee salaries:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };



exports.getAllEmployeeSalaries = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        if (!start_date || !end_date) {
            return res.status(400).json({ message: "Start Date and End Date are required" });
        }

        const users = await User.find();
        const salaryDetails = [];

        for (let user of users) {
            // Fetch attendance records within date range
            const attendanceRecords = await Attendance.find({
                user_id: user._id,
                status: { $in: ["Present", "WorkFromHome", "HalfDay"] },
                date: {
                    $gte: new Date(start_date).toISOString().split("T")[0],
                    $lte: new Date(end_date).toISOString().split("T")[0]
                }
            });

            let presentDays = 0;
            for (let record of attendanceRecords) {
                if (record.status === "HalfDay") {
                    presentDays += 0.5;
                } else {
                    presentDays += 1;
                }
            }

            const wagesPerDay = parseFloat(user.wages_per_day) || 0;
            const totalSalary = presentDays * wagesPerDay;

            salaryDetails.push({
                user_id: user._id,
                name: user.name,
                role: user.role,
                total_present_days: presentDays,
                wages_per_day: wagesPerDay,
                total_salary: totalSalary,
                start_date,
                end_date
            });
        }

        res.status(200).json(salaryDetails);

    } catch (error) {
        console.error("Error fetching employee salaries:", error);
        res.status(500).json({ message: "Server error" });
    }
};
