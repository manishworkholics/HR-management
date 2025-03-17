const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', authenticate, isAdmin, userController.createUser);
router.get('/', authenticate, isAdmin, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

module.exports = router;
