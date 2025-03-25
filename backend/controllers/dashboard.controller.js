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
        const totalAttendance = await Attendance.countDocuments();

        // 2️⃣ Total Present Employees (Assuming entry time exists means present)
        const totalPresent = await Attendance.countDocuments({ date: today, user_entry_time: { $ne: null } });

        // 3️⃣ Total Absent Employees
        const totalUsers = await User.countDocuments();
        const totalAbsent = totalUsers - totalPresent; // Employees who are not present today

        // 4️⃣ Total Late-Coming Employees (Assuming late if entry time > 10:00 AM)
        const totalLateComing = await Attendance.countDocuments({
            date: today,
            user_entry_time: { $gt: "10:15" }
        });

        // 5️⃣ Total Leave Applications
        const totalLeaveApplications = await Application.countDocuments();

        // Response JSON
        res.status(200).json({
            totalAttendance,
            totalPresent,
            totalAbsent,
            totalLateComing,
            totalLeaveApplications
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
