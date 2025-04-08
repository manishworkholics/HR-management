const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const Application = require('../models/application.model');
const Attendance = require('../models/attendance.model');
const Salary = require('../models/salary.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.dashboard = async (req, res) => {
    try {
        // Get the current date (YYYY-MM-DD format)
        const today = new Date().toISOString().split('T')[0];

        // 1️⃣ Total Attendance Records
        const totalAttendance = await Attendance.countDocuments({ date: today });

        // 2️⃣ Total Present Employees (Assuming entry time exists means present)
        const totalPresent = await Attendance.countDocuments({ date: today, user_entry_time: { $ne: null } });

        // 3️⃣ Total Absent Employees
        const totalUsers = await User.countDocuments({ active: true });
        const totalAbsent = totalUsers - totalAttendance; // Employees who are not present today

        // 4️⃣ Total Late-Coming Employees (Assuming late if entry time > 10:00 AM)
        const totalLateComing = await Attendance.countDocuments({
            date: today,
            user_entry_time: { $gt: "10:20" }
        });

        // 5️⃣ Total Leave Applications
        const totalLeaveApplications = await Application.countDocuments();


        const male = await User.countDocuments({ gender: 'male' });
        const female = await User.countDocuments({ gender: 'female' });

        const malepercent = male / totalUsers * 100
        const femalepercent = female / totalUsers * 100


        // Response JSON
        res.status(200).json({
            totalUsers,
            totalAttendance,
            totalPresent,
            totalAbsent,
            totalLateComing,
            totalLeaveApplications,
            array:[ malepercent,femalepercent]
           
            
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};



