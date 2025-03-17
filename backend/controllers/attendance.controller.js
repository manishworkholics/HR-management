const Attendance = require('../models/attendance.model');

exports.markAttendance = async (req, res) => {
    try {
        const { user_id, user_entry_time, user_exit_time } = req.body;

        const attendance = new Attendance({ user_id, user_entry_time, user_exit_time });
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

exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
