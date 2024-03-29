const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Get all users
router.get('/getallusers', userController.getAllUsers);
//get user by id
router.get('/getuser/:id', userController.getUserById);
// Create a new user
router.post('/create-user', userController.createUser);
// update user by id
router.put('/update-user/:id', userController.updateUser);
// delete user by id
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
