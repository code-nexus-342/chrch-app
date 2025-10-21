const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { isAdminEmail } = require('../db/utils');

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save to client/public/assets/img/Events directory
    const uploadPath = path.join(__dirname, '../../client/public/assets/img/Events');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    // Sanitize filename
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '-');
    cb(null, `${sanitizedBaseName}-${uniqueSuffix}${ext}`);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Middleware to check admin authorization
const checkAdminAuth = async (req, res, next) => {
  const adminEmail = req.body.adminEmail || req.headers['x-admin-email'];
  
  if (!adminEmail) {
    return res.status(401).json({ 
      message: 'Admin email is required for uploading images' 
    });
  }
  
  const isAuthorized = await isAdminEmail(adminEmail);
  
  if (!isAuthorized) {
    return res.status(403).json({ 
      message: 'Unauthorized: This email is not authorized to upload images' 
    });
  }
  
  req.adminEmail = adminEmail;
  next();
};

// Upload single image
router.post('/single', checkAdminAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the path that will be used in the frontend
    const imagePath = `/assets/img/Events/${req.file.filename}`;
    
    res.status(200).json({
      message: 'Image uploaded successfully',
      path: imagePath,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload image',
      error: error.message 
    });
  }
});

// Upload multiple images (up to 5)
router.post('/multiple', checkAdminAuth, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    
    // Map uploaded files to their paths
    const imagePaths = req.files.map(file => `/assets/img/Events/${file.filename}`);
    
    res.status(200).json({
      message: `${req.files.length} image(s) uploaded successfully`,
      paths: imagePaths,
      files: req.files.map(file => ({
        filename: file.filename,
        path: `/assets/img/Events/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload images',
      error: error.message 
    });
  }
});

// Delete uploaded image (admin only)
router.delete('/delete', checkAdminAuth, (req, res) => {
  try {
    const { filename } = req.body;
    
    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }
    
    const filePath = path.join(__dirname, '../../client/public/assets/img/Events', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    res.status(200).json({
      message: 'Image deleted successfully',
      filename: filename
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: 'Failed to delete image',
      error: error.message 
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File is too large. Maximum size is 5MB.' 
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        message: 'Too many files. Maximum is 5 images.' 
      });
    }
    return res.status(400).json({ 
      message: error.message 
    });
  }
  
  if (error) {
    return res.status(500).json({ 
      message: error.message 
    });
  }
  
  next();
});

module.exports = router;
