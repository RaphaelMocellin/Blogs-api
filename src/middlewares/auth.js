const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    try {
      jwt.verify(token, secret);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };