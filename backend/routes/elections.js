const express = require('express');
const router = express.Router();

const electionController = require('../controllers/electionController');

router.get('/', electionController.getElections);
// Get all elections
router.get('/elections', electionController.getAllElections);
// Get election by id
// router.get('/elections/:id', electionController.getElectionById);
router.get('/elections/:id', electionController.getElectionId);

// Create a new election
router.post('/elections', electionController.createElection);

router.get('/addElections', (req, res)=>{
    res.render('pages/add_election');
    console.log("Inside election page");
})
// Update election by id
router.put('/elections/:id', electionController.updateElection);
// Delete election by id
router.delete('/elections/:id', electionController.deleteElection);

module.exports = router;
