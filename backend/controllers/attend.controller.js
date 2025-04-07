const ZKLib = require('node-zklib');
const User = require('../models/user.model');
const Attendance = require('../models/attendance.model');

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







const formatDate = (date) => date.toISOString().split('T')[0];

exports.saveTodayAttendance = async (req, res) => {
    const zk = new ZKLib('192.168.29.200', 4370, 10000, 5050);

    try {
        // 1. Connect to the biometric device
        await zk.createSocket();
        const logs = await zk.getAttendances();
        await zk.disconnect();

        const today = formatDate(new Date());

        // 2. Filter today's logs
        const todayLogs = logs.data.filter(log =>
            formatDate(new Date(log.recordTime)) === today
        );

        // 3. Group logs by device user ID (userSn)
        const attendanceMap = {};
        todayLogs.forEach(log => {
            const deviceId = log.userSn;
            const recordTime = new Date(log.recordTime).toTimeString().split(' ')[0]; // HH:MM:SS

            if (!attendanceMap[deviceId]) {
                attendanceMap[deviceId] = [];
            }

            attendanceMap[deviceId].push(recordTime);
        });

        // 4. Fetch all users
        const allUsers = await User.find();

        const attendanceResults = [];

        // for (const user of allUsers) {
        //     const logs = attendanceMap[user.device_id]; // match using device_id
        //     let user_entry_time = null;
        //     let user_exit_time = null;
        //     let status = 'Absent';

        //     if (logs && logs.length > 0) {
        //         logs.sort(); // ascending
        //         user_entry_time = logs[0];
        //         user_exit_time = logs[logs.length - 1];
        //         status = 'Present';
        //     }

        //     const attendance = await Attendance.findOneAndUpdate(
        //         { user_id: user._id, date: today },
        //         {
        //             user_id: user._id,
        //             date: today,
        //             user_entry_time,
        //             user_exit_time,
        //             status,
        //             updated_at: new Date()
        //         },
        //         { upsert: true, new: true }
        //     );

        //     attendanceResults.push(attendance);
        // }


        for (const user of allUsers) {
            const logs = attendanceMap[user.device_id]; // match using device_id
            let user_entry_time = null;
            let user_exit_time = null;
            let status = 'Absent';
        
            if (logs && logs.length > 0) {
                logs.sort(); // ascending
                user_entry_time = logs[0];
                user_exit_time = logs[logs.length - 1];
        
                const entryTime = new Date(`${today}T${user_entry_time}`);
                const thresholdTime = new Date(`${today}T10:20:00`);
        
                if (entryTime > thresholdTime) {
                    status = 'HalfDay';
                } else {
                    status = 'Present';
                }
            }
        
            const attendance = await Attendance.findOneAndUpdate(
                { user_id: user._id, date: today },
                {
                    user_id: user._id,
                    date: today,
                    user_entry_time,
                    user_exit_time,
                    status,
                    updated_at: new Date()
                },
                { upsert: true, new: true }
            );
        
            attendanceResults.push(attendance);
        }
        

        res.status(200).json({
            message: `Attendance saved for ${attendanceResults.length} users.`,
            data: attendanceResults
        });

    } catch (err) {
        console.error('Error saving attendance:', err);
        res.status(500).json({ error: 'Something went wrong while saving attendance.' });
    }
};



exports.getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date is required in query (YYYY-MM-DD)' });
        }

        const attendance = await Attendance.find({ date })
            .populate('user_id', 'name email device_id') // Adjust fields as needed
            .sort({ user_entry_time: 1 });

        res.status(200).json({ date, count: attendance.length, data: attendance });
    } catch (err) {
        console.error('Error fetching attendance by date:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



exports.updateAttendanceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Present', 'Absent', 'WorkFromHome'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updated = await Attendance.findByIdAndUpdate(
            id,
            { status, updated_at: new Date() },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.status(200).json({ message: 'Attendance status updated successfully', data: updated });
    } catch (err) {
        console.error('Error updating attendance:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};





// Utility to format date to YYYY-MM-DD
// const formatDate = (date) => date.toISOString().split('T')[0];

// exports.saveTodayAttendance = async (req, res) => {
//     const zk = new ZKLib('192.168.29.200', 4370, 10000, 4000);

//     try {
//         await zk.createSocket();
//         const logs = await zk.getAttendances();
//         await zk.disconnect();

//         const today = formatDate(new Date());

//         // Filter logs for today
//         const todayLogs = logs.data.filter(log => {
//             return formatDate(new Date(log.recordTime)) === today;
//         });

//         // Group logs by userSn + date
//         const groupedLogs = {};

//         todayLogs.forEach(log => {
//             const key = `${log.userSn}_${today}`;

//             if (!groupedLogs[key]) {
//                 groupedLogs[key] = {
//                     userSn: log.userSn,
//                     deviceUserId: log.deviceUserId,
//                     date: today,
//                     logs: []
//                 };
//             }

//             groupedLogs[key].logs.push({
//                 recordTime: new Date(log.recordTime),
//                 ip: log.ip
//             });
//         });

//         // Save or update each grouped record
//         const results = [];
//         for (const key in groupedLogs) {
//             const entry = groupedLogs[key];
//             const result = await Attendance.findOneAndUpdate(
//                 { userSn: entry.userSn, date: entry.date },
//                 {
//                     $push: { logs: { $each: entry.logs } },
//                     deviceUserId: entry.deviceUserId
//                 },
//                 { upsert: true, new: true }
//             );
//             results.push(result);
//         }

//         res.status(200).json({ message: 'Today\'s attendance saved.', savedCount: results.length });

//     } catch (err) {
//         console.error('Error while saving today\'s attendance:', err);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// }



// app.get('/api/save-today-attendance', async (req, res) => {
//     const zk = new ZKLib('192.168.29.200', 4370, 10000, 4000);
  
//     try {
//       await zk.createSocket();
  
//       const logs = await zk.getAttendances();
//       await zk.disconnect();
  
//       const todayDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
//       // Group by userSn + date
//       const groupedLogs = {};
  
//       logs.data.forEach(log => {
//         const date = new Date(log.recordTime).toISOString().split('T')[0];
//         if (date !== todayDate) return; // Only today's logs
  
//         const key = `${log.userSn}_${date}`;
  
//         if (!groupedLogs[key]) {
//           groupedLogs[key] = {
//             userSn: log.userSn,
//             deviceUserId: log.deviceUserId,
//             date,
//             logs: []
//           };
//         }
  
//         groupedLogs[key].logs.push({
//           recordTime: new Date(log.recordTime),
//           ip: log.ip
//         });
//       });
  
//       // Save or update MongoDB
//       for (const key in groupedLogs) {
//         const entry = groupedLogs[key];
  
//         const existingDoc = await Attendance.findOne({
//           userSn: entry.userSn,
//           date: entry.date
//         });
  
//         let newLogs = entry.logs;
  
//         if (existingDoc) {
//           const existingTimes = new Set(
//             existingDoc.logs.map(log => new Date(log.recordTime).toISOString())
//           );
  
//           newLogs = entry.logs.filter(
//             log => !existingTimes.has(new Date(log.recordTime).toISOString())
//           );
//         }
  
//         if (newLogs.length > 0) {
//           await Attendance.findOneAndUpdate(
//             { userSn: entry.userSn, date: entry.date },
//             {
//               $push: { logs: { $each: newLogs } },
//               deviceUserId: entry.deviceUserId
//             },
//             { upsert: true, new: true }
//           );
//         }
//       }
  
//       res.status(200).json({ message: 'Today\'s attendance saved successfully' });
  
//     } catch (err) {
//       console.error('Error:', err);
//       res.status(500).json({ error: 'Failed to fetch or save attendance logs' });
//     }
//   });