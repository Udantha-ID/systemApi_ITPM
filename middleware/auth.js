const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication invalid' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const payload = isTokenValid(token);
    
    // Attach user to request object
    req.user = { 
      userId: payload.userId,
      email: payload.email
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication invalid' });
  }
};

module.exports = {
  authenticateUser
};
