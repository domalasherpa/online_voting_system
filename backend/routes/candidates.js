const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController');

// Get all candidates
router.get('/getallcandidates', candidateController.getAllCandidates);
//get candidate by id
router.get('/getcandidate/:id', candidateController.getCandidateById);
// Create a new candidate
router.post('/create-candidate', candidateController.createCandidate);
// update election by id
router.put('/update-candidate/:id', candidateController.updateCandidate);
// delete candidate by id
router.delete('/delete-candidate/:id', candidateController.deleteCandidate);

module.exports = router;
