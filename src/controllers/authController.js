import createHttpError from 'http-errors';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { generateToken } from '../middleware/authMiddleware.js';

/**
 * @desc    Register a new customer account
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      throw createHttpError(400, 'An account with this email already exists');
    }

    const assignedRole = role === 'admin' ? 'admin' : 'customer';

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
      tier: 'Tier I (Initiate of Leaves)',
      leavesPoints: 50 // Welcome bonus points
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully. Welcome to ZenLeaf!',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          tier: user.tier,
          leavesPoints: user.leavesPoints,
          tastingJournal: user.tastingJournal
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & return Bearer token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          tier: user.tier,
          leavesPoints: user.leavesPoints,
          tastingJournal: user.tastingJournal
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile + tasting journal + recent orders
 * @route   GET /api/v1/auth/me
 * @access  Private (Bearer token)
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    // Fetch recent orders
    const recentOrders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          tier: user.tier,
          leavesPoints: user.leavesPoints,
          tastingJournal: user.tastingJournal || []
        },
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a tasting note to the member's journal
 * @route   POST /api/v1/auth/tasting-journal
 * @access  Private (Bearer token)
 */
export const addTastingNote = async (req, res, next) => {
  try {
    const { productName, steepGuide, rating, notes } = req.body;

    if (!productName) {
      throw createHttpError(400, 'Product name is required for tasting journal');
    }

    const user = await User.findById(req.user._id);
    user.tastingJournal.unshift({
      productName,
      steepGuide: steepGuide || '',
      rating: Number(rating) || 5.0,
      notes: notes || '',
      steepedAt: new Date()
    });

    // Reward member with 5 Leaves points for keeping a mindful journal
    user.leavesPoints += 5;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Tasting journal entry saved! Earned +5 Leaves.',
      data: {
        tastingJournal: user.tastingJournal,
        leavesPoints: user.leavesPoints
      }
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
  addTastingNote
};
