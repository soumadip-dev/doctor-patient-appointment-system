import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';

//* Middleware for user authentication
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // If no token, throw an error
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);

    // If user doesn't exist, throw an error
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
};

//* Grant access to specific roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Get user role set in protect middleware
    const userRole = req.user?.role;

    // If user role is not in allowed roles, throw an error
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

export { protect, authorize };
