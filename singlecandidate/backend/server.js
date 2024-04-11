// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import path module

const app = express();
const PORT = 3000;

// Connect to MongoDB database named 'singlecandidate'
mongoose.connect('mongodb://localhost:27017/singlecandidate', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define candidate schema
const candidateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mobileNumber: String,
  position: String,
  citizenshipNumber: String,
  email: String,
  address: String
});

// Define the 'scandidate' model
const Candidate = mongoose.model('scandidate', candidateSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Endpoint to fetch candidate details
app.get('/candidate', async (req, res) => {
  try {
    const candidate = await Candidate.findOne();
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
