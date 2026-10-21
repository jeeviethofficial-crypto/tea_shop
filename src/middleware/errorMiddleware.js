import createHttpError from 'http-errors';
import config from '../config/env.js';

/**
 * 404 Not Found Middleware for unhandled routes
 */
export const notFound = (req, res, next) => {
  next(createHttpError(404, `Endpoint not found: ${req.method} ${req.originalUrl}`));
};

/**
 * Centralized Global Error Handler Middleware
 * Guarantees uniform structure: { success: false, message: "...", error: null | object }
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errorDetails = null;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with id of '${err.value}'`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Error: ${errors.join('. ')}`;
    errorDetails = errors;
  }

  // Handle Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    message = `Duplicate value '${value}' entered for unique field '${field}'`;
  }

  // Handle JWT Malformed / Expired
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
  }

  // Return formatted JSON
  res.status(statusCode).json({
    success: false,
    message,
    error: config.nodeEnv === 'development' ? (errorDetails || err.stack) : errorDetails
  });
};

export default { notFound, errorHandler };
