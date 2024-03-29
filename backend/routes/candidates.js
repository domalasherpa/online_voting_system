const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController');

// Get all elections
router.get('/getallcandidates', candidateController.getAllCandidates);
//get election by id
router.get('/getcandidate/:id', candidateController.getCandidateById);
// Create a new election
router.post('/create-candidate', candidateController.createCandidate);
// update election by id
router.put('/update-candidate/:id', electionController.updateCandidate);
// delete category by id
router.delete('/delete-candidate/:id', electionController.deleteCandidate);

module.exports = router;