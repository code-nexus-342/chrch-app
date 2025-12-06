const express = require('express');
const router = express.Router();
const { checkAdminAuth } = require('../middleware/authMiddleware');
const { upload, handleMulterError } = require('../middleware/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

// Upload single image
router.post('/single', checkAdminAuth, upload.single('image'), uploadController.uploadSingle);

// Upload multiple images (up to 5)
router.post('/multiple', checkAdminAuth, upload.array('images', 5), uploadController.uploadMultiple);

// Delete uploaded image (admin only)
router.delete('/delete', checkAdminAuth, uploadController.deleteImage);

// Error handling middleware for multer
router.use(handleMulterError);

module.exports = router;

