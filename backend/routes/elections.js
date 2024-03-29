const express = require('express');
const router = express.Router();

const electionController = require('../controllers/electionController');

// Get all elections
router.get('/getallelections', electionController.getAllElections);
//get election by id
router.get('/getelection/:id', electionController.getCustomerById);
// Create a new election
router.post('/create-election', electionController.createElection);
// update election by id
router.put('/update-election/:id', electionController.updateElection);
// delete election by id
router.delete('/delete-election/:id', electionController.deleteElection);

module.exports = router;
