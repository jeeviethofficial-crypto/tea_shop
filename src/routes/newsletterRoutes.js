import { Router } from 'express';
import Newsletter from '../models/Newsletter.js';
import { validateNewsletter } from '../middleware/validate.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @desc    Subscribe to the Zen Tasting Flight newsletter
 * @route   POST /api/v1/newsletter/subscribe
 * @access  Public
 */
router.post('/subscribe', validateNewsletter, async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    let subscriber = await Newsletter.findOne({ email: cleanEmail });
    if (subscriber) {
      return res.status(200).json({
        success: true,
        message: 'Welcome back! You are already subscribed to the Zen Tasting Flight.',
        data: {
          code: subscriber.welcomeCode || 'ZEN15'
        }
      });
    }

    subscriber = await Newsletter.create({
      email: cleanEmail,
      welcomeCode: 'ZEN15'
    });

    res.status(201).json({
      success: true,
      message: 'Welcome to the Zen Tasting Flight! Check your inbox for harvest previews.',
      data: {
        code: 'ZEN15',
        discountPercent: 15
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all newsletter subscribers (Admin)
 * @route   GET /api/v1/newsletter/subscribers
 * @access  Private / Admin only
 */
router.get('/subscribers', protect, authorize('admin'), async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
});

export default router;

