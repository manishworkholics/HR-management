const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/', authenticate, attendanceController.markAttendance);
router.get('/user/:id', authenticate, attendanceController.getUserAttendance);
router.get('/', authenticate, attendanceController.getAllAttendance);

module.exports = router;
