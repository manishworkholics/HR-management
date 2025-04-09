const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salary.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

router.post('/create-salary', salaryController.createSalary);
router.get('/get-salary-by-user/:id', salaryController.getSalaryByUser);
router.get('/get-all-salary', salaryController.getAllSalaries);

module.exports = router;
