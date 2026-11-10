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
 * @desc    Get categories with live product counts
 * @route   GET /api/v1/products/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const data = await productService.getCategoryCounts();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by MongoDB ID, custom id, or slug
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
      id,
      name,
      title,
      japaneseName,
      slug,
      category,
      origin,
      subregion,
      elevation,
      harvest,
      caffeine,
      badge,
      image,
      imageUrl,
      description,
      flavorNotes,
      tastingNotes,
      brewGuide,
      variants,
      isFeatured
    } = req.body;

    const product = await Product.create({
      id: id || slug,
      name: name || title,
      japaneseName,
      slug,
      category,
      origin,
      subregion,
      elevation,
      harvest,
      caffeine,
      badge,
      image: image || imageUrl,
      description,
      flavorNotes: flavorNotes || tastingNotes || [],
      brewGuide,
      variants,
      isFeatured: !!isFeatured
    });

    res.status(201).json({
      success: true,
      message: 'Artisan product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/v1/products/:id
 * @access  Private / Admin only
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [
        { id },
        ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
        { slug: id }
      ]
    });

    if (!product) {
      throw createHttpError(404, `Product not found with identifier '${id}'`);
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/v1/products/:id
 * @access  Private / Admin only
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({
      $or: [
        { id },
        ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : []),
        { slug: id }
      ]
    });

    if (!product) {
      throw createHttpError(404, `Product not found with identifier '${id}'`);
    }

    res.status(200).json({
      success: true,
      message: `Product '${product.name}' deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
