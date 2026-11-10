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
 * Mandatory Bearer token authentication
 */
export const protect = async (req, res, next) => {
  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw createHttpError(401, 'Authentication required: No Bearer token provided');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createHttpError(401, 'Authentication failed: Token has expired');
      }
      throw createHttpError(401, 'Authentication failed: Invalid or malformed token');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'Authentication failed: User account no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication: attaches req.user if Bearer token present, but allows guests
 */
export const optionalProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await User.findById(decoded.id);
      req.user = user || null;
    } catch {
      req.user = null;
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Restrict route access based on user role(s)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, 'Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        createHttpError(
          403,
          `Access forbidden: Role '${req.user.role}' is not authorized for this resource`
        )
      );
    }

    next();
  };
};

export default { protect, optionalProtect, authorize, generateToken };
