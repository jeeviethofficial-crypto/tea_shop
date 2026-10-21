import createHttpError from 'http-errors';
import Product from '../models/Product.js';
import productService from '../services/productService.js';

/**
 * @desc    Get all products with category filter, search, sort, and pagination
 * @route   GET /api/v1/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.queryProducts(req.query);

    res.status(200).json({
      success: true,
      count: result.products.length,
      pagination: result.pagination,
      data: result.products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by MongoDB ID or slug
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findProductByIdOrSlug(id);

    if (!product) {
      throw createHttpError(404, `Product not found with identifier '${id}'`);
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new artisan tea product
 * @route   POST /api/v1/products
 * @access  Private / Admin only
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      origin,
      tastingNotes,
      variants,
      imageUrl,
      isFeatured,
      brewingGuide
    } = req.body;

    const product = await Product.create({
      title,
      slug,
      category,
      origin,
      tastingNotes,
      variants,
      imageUrl,
      isFeatured: !!isFeatured,
      brewingGuide
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct
};
