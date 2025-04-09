const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');


router.get('/dashboard-detail', dashboardController.dashboard);
router.get('/user-dashboard/:userId', dashboardController.userDashboard);

module.exports = router;
