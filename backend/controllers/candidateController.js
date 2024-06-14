const Candidate = require("../models/candidate");

const candidateController = {
    // Get all candidates
    getAllCandidates: async (req, res) => {
        try {
            const candidates = await Candidate.find();
            res.render('pages/candidates', { candidates }); //check if the userType and render acordingly
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get candidate by id
    getCandidateById: async (req, res) => {
        try {
            const candidate = await Candidate.findById(req.params.id);
            if (!candidate) {
                return res.status(404).json({ error: "Candidate not found" });
            }
            res.render('pages/uDashboard/userDashboard', {'type':'candidate', candidate});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new candidate
    createCandidate: async (req, res) => {
        try {
            const newCandidate = new Candidate(req.body);
            await newCandidate.save();
            res.status(201).json(newCandidate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update candidate by id
    updateCandidate: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updatedCandidate) {
                return res.status(404).json({ error: "Candidate not found" });
            }
            res.json(updatedCandidate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete candidate by id
    deleteCandidate: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCandidate = await Candidate.findByIdAndDelete(id);
            if (!deletedCandidate) {
                return res.status(404).json({ error: "Candidate not found" });
            }
            res.json({ message: "Candidate deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = candidateController;
