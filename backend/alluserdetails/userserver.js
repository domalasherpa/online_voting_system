const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/try');

// Define User schema
// const userSchema = new mongoose.Schema({
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
const User = require('../models/user.js');

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users); // Logging fetched users to console
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to add a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Assuming you're sending user data in the request body
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route to serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UserDetails.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});