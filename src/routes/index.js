import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';

const apiRouter = Router();

// API Health Check
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ZenLeaf Tea API is operational',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Resource Routers
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);

export default apiRouter;
