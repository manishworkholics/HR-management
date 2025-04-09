const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const Application = require('../models/application.model');
const Attendance = require('../models/attendance.model');
const moment = require('moment');
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



exports.userDashboard = async (req, res) => {
    try {
        const userId = req.params.userId; 
        // Get today's date in YYYY-MM-DD format
        const today = moment().format("YYYY-MM-DD");

        // Get total attendance records for user
        const totalAttendance = await Attendance.countDocuments({ user_id: userId });

        // Get total absent days (Assuming attendance not marked on those days)
        const firstAttendance = await Attendance.findOne({ user_id: userId }).sort({ date: 1 });
        const startDate = firstAttendance ? moment(firstAttendance.date) : moment().startOf('month');
        const totalDaysTillToday = moment(today).diff(startDate, 'days') + 1;
        const totalAbsent = totalDaysTillToday - totalAttendance;

        // Late coming count (entry after 10:20 AM)
        const totalLateComing = await Attendance.countDocuments({
            user_id: userId,
            user_entry_time: { $gt: "10:20" }
        });

        // Leave applications by user
        const totalLeaveApplications = await Application.countDocuments({ user_id: userId });

        // Send dashboard response
        res.status(200).json({
            totalAttendance,
            totalAbsent,
            totalLateComing,
            totalLeaveApplications
        });

    } catch (error) {
        console.error("Error fetching user dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
