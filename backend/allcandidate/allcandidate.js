const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Connect to MongoDB with correct database name
mongoose.connect('mongodb://localhost/AllCandidate');
app.use(express.json());
// Define Candidate schema
// const candidateSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     mobileNumber: String,
//     position: String,
//     citizenshipNumber: String,
//     email: String,
//     address: String
// });

// Define Candidate model
// const Candidate = mongoose.model('Candidate', candidateSchema);
const Candidate = require('../models/candidate.js');

// Route to fetch all candidates
app.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        console.log(candidates); // Logging fetched candidates to console
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/candidates', async (req, res) => {
    try {
        console.log(req.body);
      const newCandidate = await Candidate.create(req.body); // Assuming you're sending user data in the request body
      res.status(201).json(newCandidate);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

// Route to serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'allcandidate.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
