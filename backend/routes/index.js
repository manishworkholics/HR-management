const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin.routes'));
router.use('/users', require('./user.routes'));
router.use('/attendance', require('./attendance.routes'));
router.use('/applications', require('./application.routes'));
router.use('/salaries', require('./salary.routes'));
router.use('/dashboard', require('./dashboard.routes'));


module.exports = router;
