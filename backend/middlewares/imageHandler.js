const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
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
  limits: { fileSize: 307200 }, // Limit file size to 300kb
  fileFilter: function (req, file, cb) {
    if (!validateImageType(file)) {
      return cb(new Error('Invalid image type. Only .jpg, .jpeg, .png, .gif, and .bmp files are allowed'));
    }
    cb(null, true);
  }
});

function validateUserImage(req, res, next) {
    if (!req.file) {
        console.log("no image file");
        return next();
    }

    // Validate image file typej
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
        return next(createHttpError.BadRequest('Invalid image type. Only JPEG, PNG, and GIF files are allowed'));
    }

    // Validate image file size (max size: 300KB)
    const maxFileSize = 300 * 1024; // 300KB in bytes
    if (req.file.size > maxFileSize) {
        return next(createHttpError.BadRequest('Image file size exceeds the limit (max: 300KB)'));
    }

    // If validation passes, proceed to the next middleware
    next();
}



module.exports = {upload, validateUserImage};

