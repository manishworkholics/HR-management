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
        const { user_id } = req.params;
        const attendanceRecords = await Attendance.find({ user_id }).sort({ date: -1 });

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching user attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};