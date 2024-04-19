const express = require('express');
const router = express.Router();

const electionController = require('../controllers/electionController');

// Get all elections
router.get('/elections', electionController.getAllElections);
// Get election by id
router.get('/elections/:id', electionController.getElectionById);
// Create a new election
router.post('/elections', electionController.createElection);
// Update election by id
router.put('/elections/:id', electionController.updateElection);
// Delete election by id
router.delete('/elections/:id', electionController.deleteElection);

module.exports = router;
