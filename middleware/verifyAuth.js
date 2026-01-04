import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const verifyAuth = async (req, res, next) => {
  const token = req.cookies.cookie;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
}