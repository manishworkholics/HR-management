const ZKLib = require('node-zklib');
const Attendance = require('../models/atten.model');

exports.getattend = async (req, res) => {
    try {
        const attend = await Attendance.find();
        res.json(attend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.saveAttendanceLogs = async (req, res) => {
    const zk = new ZKLib('192.168.29.200', 4370, 10000, 4000);

    try {
        await zk.createSocket();
        const logs = await zk.getAttendances();
        await zk.disconnect();

        const groupedLogs = {};

        logs.data.forEach(log => {
            const date = new Date(log.recordTime).toISOString().split('T')[0];
            const key = `${log.userSn}_${date}`;

            if (!groupedLogs[key]) {
                groupedLogs[key] = {
                    userSn: log.userSn,
                    deviceUserId: log.deviceUserId,
                    date,
                    logs: []
                };
            }

            groupedLogs[key].logs.push({
                recordTime: new Date(log.recordTime),
                ip: log.ip
            });
        });

        for (const key in groupedLogs) {
            const entry = groupedLogs[key];
            await Attendance.findOneAndUpdate(
                { userSn: entry.userSn, date: entry.date },
                {
                    $push: { logs: { $each: entry.logs } },
                    deviceUserId: entry.deviceUserId
                },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ message: 'Attendance saved successfully' });

    } catch (err) {
        console.error('Error fetching/saving logs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// Utility to format date to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

exports.saveTodayAttendance = async (req, res) => {
    const zk = new ZKLib('192.168.29.200', 4370, 10000, 4000);

    try {
        await zk.createSocket();
        const logs = await zk.getAttendances();
        await zk.disconnect();

        const today = formatDate(new Date());

        // Filter logs for today
        const todayLogs = logs.data.filter(log => {
            return formatDate(new Date(log.recordTime)) === today;
        });

        // Group logs by userSn + date
        const groupedLogs = {};

        todayLogs.forEach(log => {
            const key = `${log.userSn}_${today}`;

            if (!groupedLogs[key]) {
                groupedLogs[key] = {
                    userSn: log.userSn,
                    deviceUserId: log.deviceUserId,
                    date: today,
                    logs: []
                };
            }

            groupedLogs[key].logs.push({
                recordTime: new Date(log.recordTime),
                ip: log.ip
            });
        });

        // Save or update each grouped record
        const results = [];
        for (const key in groupedLogs) {
            const entry = groupedLogs[key];
            const result = await Attendance.findOneAndUpdate(
                { userSn: entry.userSn, date: entry.date },
                {
                    $push: { logs: { $each: entry.logs } },
                    deviceUserId: entry.deviceUserId
                },
                { upsert: true, new: true }
            );
            results.push(result);
        }

        res.status(200).json({ message: 'Today\'s attendance saved.', savedCount: results.length });

    } catch (err) {
        console.error('Error while saving today\'s attendance:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}