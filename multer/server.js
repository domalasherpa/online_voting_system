const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const app = express();
const port = 3000;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Function to validate image type
function validateImageType(file) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
  return allowedTypes.includes(file.mimetype);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const uniqueFilename = `${year}${month}${day}-${hours}${minutes}${seconds}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 300000 }, // Limit file size to 300kb
  fileFilter: function (req, file, cb) {
    if (!validateImageType(file)) {
      return cb(new Error('Invalid image type. Only .jpg, .jpeg, .png, .gif, and .bmp files are allowed'));
    }
    cb(null, true);
  }
});

// Define route for file upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }

    // Validate image dimensions
    const dimensions = sizeOf(path.join(uploadDir, req.file.filename));
    if (dimensions.width < 100 || dimensions.height < 100) {
      // Delete the file if it doesn't meet the minimum dimensions
      fs.unlinkSync(path.join(uploadDir, req.file.filename));
      return res.status(400).json({ error: 'Image dimensions must be at least 100x100 pixels' });
    }

    // Upload successful
    const imagePath = req.file.filename;

    // In real application, save imagePath to your database

    res.json({ message: 'Upload successful', imagePath });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
