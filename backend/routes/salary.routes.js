const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salary.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', authenticate, isAdmin, salaryController.createSalary);
router.get('/user/:id', authenticate, salaryController.getSalaryByUser);
router.get('/', authenticate, isAdmin, salaryController.getAllSalaries);

module.exports = router;
