const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidateController');

// Get all candidates
router.get('/candidates', candidateController.getAllCandidates);
// Get candidate by id
router.get('/candidates/:id', candidateController.getCandidateById);
// Create a new candidate
router.post('/candidates', candidateController.createCandidate);
// Update candidate by id
router.put('/candidates/:id', candidateController.updateCandidate);
// Delete candidate by id
router.delete('/candidates/:id', candidateController.deleteCandidate);

module.exports = router;
