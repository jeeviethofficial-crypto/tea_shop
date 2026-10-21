import createHttpError from 'http-errors';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

/**
 * Validates cart items, verifies stock availability,
 * calculates authoritative server-side totals, decrements inventory, and saves the order.
 *
 * @param {Object} params
 * @param {string} params.userId - Authenticated user ID
 * @param {Array} params.items - Array of { product, variantSize, quantity }
 * @param {Object} params.shippingAddress - Shipping address object
 * @returns {Promise<Object>} Created order document
 */
export const processOrderCreation = async ({ userId, items, shippingAddress }) => {
  const verifiedOrderItems = [];
  let calculatedTotal = 0;
  const productsToUpdate = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw createHttpError(404, `Product not found with id: ${item.product}`);
    }

    // Locate requested variant
    const variant = product.variants.find(
      (v) => v.size.toLowerCase() === item.variantSize.trim().toLowerCase()
    );

    if (!variant) {
      throw createHttpError(
        400,
        `Variant size '${item.variantSize}' does not exist for product '${product.title}'`
      );
    }

    // Check inventory stock
    if (variant.stock < item.quantity) {
      throw createHttpError(
        400,
        `Insufficient stock for '${product.title}' (${variant.size}). Requested: ${item.quantity}, Available: ${variant.stock}`
      );
    }

    // Authoritative server-side pricing calculation
    const itemSubtotal = variant.price * item.quantity;
    calculatedTotal += itemSubtotal;

    // Track variant stock decrement
    variant.stock -= item.quantity;
    productsToUpdate.push(product);

    verifiedOrderItems.push({
      product: product._id,
      variantSize: variant.size,
      price: variant.price,
      quantity: item.quantity
    });
  }

  // Persist stock decrements
  for (const product of productsToUpdate) {
    await product.save();
  }

  // Create the new Order record
  const order = await Order.create({
    user: userId,
    items: verifiedOrderItems,
    totalAmount: Math.round(calculatedTotal * 100) / 100, // round to 2 decimals
    shippingAddress: shippingAddress || {},
    status: 'pending',
    paymentStatus: 'unpaid'
  });

  // Populate product details for the immediate response
  await order.populate('items.product', 'title slug imageUrl category');

  return order;
};

/**
 * Retrieve paginated order history for a specific customer
 *
 * @param {string} userId - Customer User ID
 * @returns {Promise<Array>} List of user orders
 */
export const getUserOrders = async (userId) => {
  return Order.find({ user: userId })
    .populate('items.product', 'title slug imageUrl category brewingGuide')
    .sort({ createdAt: -1 });
};

export default {
  processOrderCreation,
  getUserOrders
};
