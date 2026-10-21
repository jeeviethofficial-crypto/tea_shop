import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateOrder } from '../middleware/validate.js';

const router = Router();

// All order routes require Bearer token authentication
router.use(protect);

router.post('/', validateOrder, createOrder);
router.get('/my-orders', getMyOrders);

export default router;
