const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/', authenticate, applicationController.createApplication);
router.get('/', authenticate, applicationController.getApplications);
router.put('/:id', authenticate, applicationController.updateApplicationStatus);

module.exports = router;
