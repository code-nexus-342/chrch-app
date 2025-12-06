const path = require('path');
const fs = require('fs');

const uploadSingle = (req, res, next) => {
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
    next(error);
  }
};

const uploadMultiple = (req, res, next) => {
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
    next(error);
  }
};

const deleteImage = (req, res, next) => {
  try {
    const { filename } = req.body;
    
    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }
    
    // SECURITY NOTE: This path is hardcoded for safety somewhat, but 'filename' 
    // should ideally be sanitized more thoroughly to prevent directory traversal 
    // if '..' was passed (though path.join handles some of this, better safe).
    // The previous implementation had simple path joining.
    // We should strictly ensure we are only deleting from the Events directory.
    
    const safeFilename = path.basename(filename); 
    if (safeFilename !== filename) {
         // If they differ, someone might be trying a path traversal attack
         return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(__dirname, '../../client/public/assets/img/Events', safeFilename);
    
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
    next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteImage
};
