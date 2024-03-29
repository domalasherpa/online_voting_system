const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Get all elections
router.get('/getallusers', userController.getAllUsers);
//get election by id
router.get('/getuser/:id', userController.getUserById);
// Create a new election
router.post('/create-user', candidateController.createUser);
// update election by id
router.put('/update-user/:id', electionController.updateUser);
// delete category by id
router.delete('/delete-user/:id', electionController.deleteUser);

module.exports = router;