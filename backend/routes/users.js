const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Get all users
router.get('/users', userController.getAllUsers);
// Get user by id
router.get('/users/:id', userController.getUserById);
// Create a new user
router.post('/users', userController.createUser);
// Update user by id
router.put('/users/:id', userController.updateUser);
// Delete user by id
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
