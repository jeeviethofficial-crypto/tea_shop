import createHttpError from 'http-errors';

/**
 * Validate registration input
 */
export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return next(createHttpError(400, 'Name is required'));
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return next(createHttpError(400, 'Valid email is required'));
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return next(createHttpError(400, 'Please provide a valid email format'));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(createHttpError(400, 'Password must be at least 6 characters long'));
  }

  next();
};

/**
 * Validate login input
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, 'Both email and password are required'));
  }

  next();
};

/**
 * Validate product creation input
 */
export const validateProduct = (req, res, next) => {
  const { title, category, variants } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return next(createHttpError(400, 'Product title is required'));
  }

  const validCategories = [
    'Green & Matcha',
    'Black & Oolong',
    'Herbal & Infusions',
    'Tea Ware & Gifts'
  ];

  if (!category || !validCategories.includes(category)) {
    return next(
      createHttpError(
        400,
        `Category must be one of: ${validCategories.join(', ')}`
      )
    );
  }

  if (!Array.isArray(variants) || variants.length === 0) {
    return next(createHttpError(400, 'At least one variant size with price is required'));
  }

  for (const v of variants) {
    if (!v.size || typeof v.price !== 'number' || v.price < 0) {
      return next(
        createHttpError(
          400,
          'Each variant must specify a size and a non-negative price'
        )
      );
    }
  }

  next();
};

/**
 * Validate order creation input
 */
export const validateOrder = (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return next(createHttpError(400, 'Order must contain at least one item'));
  }

  for (const item of items) {
    if (!item.product) {
      return next(createHttpError(400, 'Each item must have a valid product ID'));
    }
    if (!item.variantSize) {
      return next(createHttpError(400, 'Each item must specify a variantSize'));
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
      return next(createHttpError(400, 'Item quantity must be a positive integer'));
    }
  }

  next();
};

export default {
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder
};
