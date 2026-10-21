import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/User.js';
import config from '../config/env.js';

/**
 * Generate a signed JWT token for a given user ID
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

/**
 * Middleware to authenticate requests via Bearer token
 * Compatible with both web and React Native/Expo mobile clients
 */
export const protect = async (req, res, next) => {
  try {
    let token = null;

    // Check Authorization header for Bearer token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw createHttpError(401, 'Authentication failed: No Bearer token provided');
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createHttpError(401, 'Authentication failed: Token has expired');
      }
      throw createHttpError(401, 'Authentication failed: Invalid or malformed token');
    }

    // Lookup user by decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'Authentication failed: User no longer exists');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict route access based on user roles (e.g. 'admin')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, 'Not authenticated'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        createHttpError(
          403,
          `Access forbidden: User role '${req.user.role}' is not authorized to access this route`
        )
      );
    }

    next();
  };
};

export default { protect, authorize, generateToken };
