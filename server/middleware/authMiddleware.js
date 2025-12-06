const { isAdminEmail } = require('../db/utils');

const checkAdminAuth = async (req, res, next) => {
  const adminEmail = req.body?.adminEmail || req.headers['x-admin-email'];
  
  if (!adminEmail) {
    return res.status(401).json({ 
      message: 'Admin email is required for this operation' 
    });
  }
  
  // Create mock req/res for the next steps if this is used within upload middleware context
  // but strictly speaking, isAdminEmail is a DB utility.
  
  try {
    const isAuthorized = await isAdminEmail(adminEmail);
    
    if (!isAuthorized) {
      return res.status(403).json({ 
        message: 'Unauthorized: This email is not authorized' 
      });
    }
    
    req.adminEmail = adminEmail;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error during auth check' });
  }
};

module.exports = { checkAdminAuth };
