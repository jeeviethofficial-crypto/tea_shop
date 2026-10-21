import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateProduct } from '../middleware/validate.js';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only route
router.post('/', protect, authorize('admin'), validateProduct, createProduct);

export default router;
