import createHttpError from 'http-errors';
import orderService from '../services/orderService.js';
import couponService from '../services/couponService.js';
import Order from '../models/Order.js';

/**
 * @desc    Create and place a new order (supports guest and authenticated checkout)
 * @route   POST /api/v1/orders
 * @access  Public / Optional Bearer token
 */
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      customer,
      discountCode,
      paymentDetails
    } = req.body;

    const userId = req.user ? req.user._id : null;

    const order = await orderService.processOrderCreation({
      userId,
      customer: customer || (req.user ? { name: req.user.name, email: req.user.email } : {}),
      items,
      discountCode,
      shippingAddress,
      paymentDetails
    });

    res.status(201).json({
      success: true,
      message: 'Order created and placed successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order history for the current authenticated customer
 * @route   GET /api/v1/orders/my-orders
 * @access  Private (Bearer token)
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user._id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order details by human-readable orderId (e.g. ZL-839201)
 * @route   GET /api/v1/orders/:orderId
 * @access  Public / Customer or Admin
 */
export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.findOrderById(orderId);

    if (!order) {
      throw createHttpError(404, `Order '${orderId}' not found`);
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Validate a promo / coupon code against current subtotal
 * @route   POST /api/v1/orders/validate-coupon
 * @access  Public
 */
export const validateCouponCode = (req, res) => {
  const { code, subtotal } = req.body;
  const result = couponService.validateCoupon(code, Number(subtotal) || 0);

  res.status(200).json({
    success: result.valid,
    data: result
  });
};

/**
 * @desc    Update order fulfillment / shipment status
 * @route   PATCH /api/v1/orders/:orderId/status
 * @access  Private / Admin only
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw createHttpError(400, `Status must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await Order.findOneAndUpdate(
      { orderId: orderId.toUpperCase().trim() },
      { status },
      { new: true }
    );

    if (!order) {
      throw createHttpError(404, `Order '${orderId}' not found`);
    }

    res.status(200).json({
      success: true,
      message: `Order ${order.orderId} status updated to '${status}'`,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  getMyOrders,
  getOrderById,
  validateCouponCode,
  updateOrderStatus
};
