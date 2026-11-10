import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  validateCouponCode,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, optionalProtect, authorize } from '../middleware/authMiddleware.js';
import { validateOrder } from '../middleware/validate.js';

const router = Router();

// Order creation supports both guest & authenticated customers via optionalProtect
router.post('/', optionalProtect, validateOrder, createOrder);

// Coupon code validation endpoint
router.post('/validate-coupon', validateCouponCode);

// Lookup order by ZL-XXXXXX confirmation code
router.get('/:orderId', getOrderById);

// Authenticated customer order history
router.get('/customer/my-orders', protect, getMyOrders);

// Admin status update
router.patch('/:orderId/status', protect, authorize('admin'), updateOrderStatus);

export default router;
