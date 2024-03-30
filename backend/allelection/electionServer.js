const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/try');

// Define User schema
// const electionschema = new mongoose.Schema({
//   name: String,
//   parentName: String,
//   age: Number,
//   mobileNumber: String,
//   email: String,
//   citizenshipNumber: String,
//   address: String,
//   eligible: Boolean,
//   verified: Boolean
// });

// Define User model

app.use(express.json());
const Election = require('../models/election.js');

// Route to fetch all elctions
app.get('/elections', async (req, res) => {
  try {
    const elections= await Election.find();
    console.log(elections);
    res.json(elections);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to add a new election
app.post('/elections', async (req, res) => {
  try {
    const newElection = await Election.create(req.body); // Assuming you're sending user data in the request body
    res.status(201).json(newElection);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'electionDetails.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});