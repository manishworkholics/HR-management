const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, isAdmin } = require('../middlewares/auth.middleware');

// router.post('/', authenticate, isAdmin, userController.createUser);
// router.get('/', authenticate, isAdmin, userController.getAllUsers);
// router.get('/:id', authenticate, userController.getUserById);
// router.put('/:id', authenticate, userController.updateUser);
// router.delete('/:id', authenticate, isAdmin, userController.deleteUser);

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login-user', userController.loginUser);

module.exports = router;
