const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// router.post('/', authenticate, applicationController.createApplication);
// router.get('/', authenticate, applicationController.getApplications);
// router.put('/:id', authenticate, applicationController.updateApplicationStatus);

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getApplications);
router.put('/:id', applicationController.updateApplicationStatus);

module.exports = router;
