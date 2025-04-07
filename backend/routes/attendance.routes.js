const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const attendController = require('../controllers/attend.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// router.post('/', authenticate, attendanceController.markAttendance);
// router.get('/user/:id', authenticate, attendanceController.getUserAttendance);
// router.get('/', authenticate, attendanceController.getAllAttendance);

router.post('/', attendanceController.markAttendance);
router.get("/:month/:year", attendanceController.getMonthlyAttendance);
router.get('/user/:id', attendanceController.getUserAttendance);
router.get('/', attendanceController.getAllAttendance);

router.get('/employees', attendanceController.getAllEmployeesForAttendance);
router.post('/bulk', attendanceController.bulkAttendance);


router.get('/salary/:user_id', attendanceController.calculateSalary);
router.get('/salaries', attendanceController.getAllEmployeeSalaries);

router.get('/emp', attendController.getattend);
router.get('/save', attendController.saveAttendanceLogs);
router.get('/save-per-day', attendController.saveTodayAttendance);

router.get('/get-attendance-by-date', attendController.getAttendanceByDate);
router.put('/update-attendance-single/:id', attendController.updateAttendanceStatus);

module.exports = router;
