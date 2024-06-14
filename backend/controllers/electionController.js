const Election = require("../models/election");
const Users = require("../models/user"); //testing
const electionController = {
	// Get all elections
	getAllElections: async (req, res) => {
		try {
			const elections = await Election.find();
			// res.json(elections);
			res.render('pages/elections', {elections});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getElections: async(req, res)=>{
		try {
			const elections = await Election.find();
			// res.json(elections);
			res.render('pages/uDashboard/userDashboard', {'type':'elections', elections});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getElectionId: async(req, res)=>{
		const electionId = req.params.id;

		try {
			// Find the election document by id
			const election = await Election.findById(electionId).populate('candidates');

			if (!election) {
				return res.status(404).json({ message: 'Election not found' });
			}
			console.log("inside the single election controller");
			res.render('pages/uDashboard/userDashboard', {'type': 'election', election});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	},
	// Get election by id
	getElectionById: async (req, res) => {
		try {
			const election = await Election.findById(req.params.id);
			const users = await Users.find(); //testing
			if (!election) {
				console.log("election not found");
				return res.status(404).json({ error: "Election not found" });
			}
			// res.json(election);
			res.render('pages/election', {election, users});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Create a new election
	createElection: async (req, res) => {
		try {
			console.log(req.body);
			const newElection = new Election(req.body);
			//add some validations...

			await newElection.save();
			res.status(201).json({success: true});
		} catch (error) {
			console.log("error", error);
			res.status(400).json({ error: error.message });
		}
	},

	// Update election by id
	updateElection: async (req, res) => {
		try {
			const { id } = req.params;
			const updatedElection = await Election.findByIdAndUpdate(id, req.body, {
				new: true,
			});
			if (!updatedElection) {
				return res.status(404).json({ error: "Election not found" });
			}
			res.json(updatedElection);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	// Delete election by id
	deleteElection: async (req, res) => {
		try {
			const { id } = req.params;
			const deletedElection = await Election.findByIdAndDelete(id);
			if (!deletedElection) {
				return res.status(404).json({ error: "Election not found" });
			}
			res.json({ message: "Election deleted successfully" });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},
};

module.exports = electionController;
