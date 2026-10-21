import orderService from '../services/orderService.js';

/**
 * @desc    Create and place a new order
 * @route   POST /api/v1/orders
 * @access  Private (Bearer token)
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user._id;

    const order = await orderService.processOrderCreation({
      userId,
      items,
      shippingAddress
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

export default {
  createOrder,
  getMyOrders
};
