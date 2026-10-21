import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import config from './config/env.js';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing (CORS) configured for Web and Mobile clients
const allowedOrigins = config.corsOrigin === '*'
  ? '*'
  : config.corsOrigin.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow mobile apps, curl, or same-origin requests with no origin header
      if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  })
);

// HTTP request logger
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
}

// Request rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Max 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in 15 minutes',
    error: null
  }
});

app.use('/api', apiLimiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API v1 router
app.use('/api/v1', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ZenLeaf Tea Artisan REST API',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

// Centralized 404 & Error Handling
app.use(notFound);
app.use(errorHandler);

// Start server after connecting to database
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.port, () => {
      console.log(
        `[Server] ZenLeaf Tea API running in ${config.nodeEnv} mode on port ${config.port}`
      );
      console.log(`[Server] Health check: http://localhost:${config.port}/api/v1/health`);
    });

    // Graceful shutdown handling
    const shutdown = async (signal) => {
      console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
      server.close(() => {
        console.log('[Server] HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    return server;
  } catch (error) {
    console.error(`[Server Error] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Auto-start when executed directly
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
