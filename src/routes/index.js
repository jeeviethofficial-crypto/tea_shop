import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import quizRoutes from './quizRoutes.js';

const apiRouter = Router();

// API Health Check & System Status
apiRouter.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    message: 'ZenLeaf Tea Artisan REST API is operational',
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      name: mongoose.connection.name || 'zenleaf_tea'
    },
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Mount Resource Routers
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/newsletter', newsletterRoutes);
apiRouter.use('/quiz', quizRoutes);

export default apiRouter;
