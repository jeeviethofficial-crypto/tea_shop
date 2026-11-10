import createHttpError from 'http-errors';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import couponService from './couponService.js';

/**
 * Validates cart items, verifies stock, applies discounts,
 * computes authoritative server-side totals, decrements inventory, and saves the order.
 *
 * @param {Object} params
 * @param {string|null} params.userId - Authenticated user ID (optional)
 * @param {Object} params.customer - Guest or authenticated customer details { name, email, phone }
 * @param {Array} params.items - Array of { product: id|string, variant: { id }, quantity: number }
 * @param {string} params.discountCode - Optional coupon code
 * @param {Object} params.shippingAddress - Shipping address object
 * @param {Object} params.paymentDetails - Payment method info
 * @returns {Promise<Object>} Created order document
 */
export const processOrderCreation = async ({
  userId = null,
  customer = {},
  items = [],
  discountCode = '',
  shippingAddress = {},
  paymentDetails = {}
}) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw createHttpError(400, 'Order must contain at least one item');
  }

  const verifiedOrderItems = [];
  let calculatedSubtotal = 0;
  const productsToUpdate = [];

  for (const item of items) {
    // Locate product by custom id, ObjectId, or slug
    const productId = typeof item.product === 'object' ? item.product?.id || item.product?._id : item.product;
    
    let product = await Product.findOne({
      $or: [
        { id: productId },
        ...(productId && productId.toString().match(/^[0-9a-fA-F]{24}$/) ? [{ _id: productId }] : []),
        { slug: productId }
      ]
    });

    if (!product) {
      throw createHttpError(404, `Product not found with identifier: ${productId}`);
    }

    // Locate requested variant (by id or label)
    const targetVariantId = item.variant?.id || item.variantId || item.variantSize;
    const variant = product.variants.find(
      (v) =>
        (v.id && targetVariantId && v.id.toLowerCase() === targetVariantId.toString().toLowerCase()) ||
        (v.label && targetVariantId && v.label.toLowerCase() === targetVariantId.toString().toLowerCase())
    ) || product.variants[0];

    if (!variant) {
      throw createHttpError(400, `Variant not found for product "${product.name}"`);
    }

    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);

    // Check inventory stock if tracked
    if (variant.stock !== undefined && variant.stock < qty) {
      throw createHttpError(
        400,
        `Insufficient inventory for "${product.name}" (${variant.label}). Available: ${variant.stock}, Requested: ${qty}`
      );
    }

    const itemPrice = Number(variant.price);
    const itemSubtotal = Math.round(itemPrice * qty * 100) / 100;
    calculatedSubtotal += itemSubtotal;

    // Decrement stock
    if (variant.stock !== undefined) {
      variant.stock = Math.max(0, variant.stock - qty);
      if (variant.stock === 0) {
        variant.inStock = false;
      }
      productsToUpdate.push(product);
    }

    verifiedOrderItems.push({
      product: product.id || product._id,
      productName: product.name,
      productImage: product.image,
      variantId: variant.id,
      variantLabel: variant.label,
      price: itemPrice,
      quantity: qty,
      subtotal: itemSubtotal
    });
  }

  // Persist inventory decrements
  for (const prod of productsToUpdate) {
    await prod.save();
  }

  // Round subtotal to 2 decimals
  calculatedSubtotal = Math.round(calculatedSubtotal * 100) / 100;

  // Validate discount code if provided
  let discountPercent = 0;
  let discountAmount = 0;
  let appliedDiscountCode = '';

  if (discountCode && discountCode.trim()) {
    const couponResult = couponService.validateCoupon(discountCode, calculatedSubtotal);
    if (couponResult.valid) {
      discountPercent = couponResult.discountPercent;
      discountAmount = couponResult.discountAmount;
      appliedDiscountCode = couponResult.code;
    }
  }

  // Authoritative shipping calculation: Free over $60 or standard $7
  const afterDiscount = Math.max(0, calculatedSubtotal - discountAmount);
  const shippingAmount = afterDiscount >= 60 || afterDiscount === 0 ? 0 : 7.0;

  const grandTotal = Math.round((afterDiscount + shippingAmount) * 100) / 100;

  // Generate unique Order Confirmation Number: ZL-XXXXXX
  const orderId = `ZL-${Math.floor(100000 + Math.random() * 900000)}`;

  // Create the Order record
  const order = await Order.create({
    orderId,
    user: userId || null,
    customer: {
      name: customer.name || shippingAddress.fullName || 'Guest Customer',
      email: customer.email || '',
      phone: customer.phone || ''
    },
    items: verifiedOrderItems,
    subtotal: calculatedSubtotal,
    discountCode: appliedDiscountCode,
    discountPercent,
    discountAmount,
    shippingAmount,
    grandTotal,
    shippingAddress: {
      fullName: shippingAddress.fullName || customer.name || '',
      street: shippingAddress.street || shippingAddress.address || '',
      city: shippingAddress.city || '',
      state: shippingAddress.state || '',
      postalCode: shippingAddress.postalCode || shippingAddress.zip || '',
      country: shippingAddress.country || 'USA'
    },
    paymentDetails: {
      method: paymentDetails.method || 'card',
      last4: paymentDetails.cardNumber ? paymentDetails.cardNumber.slice(-4) : '4242',
      status: 'paid'
    },
    status: 'processing'
  });

  return order;
};

/**
 * Retrieve order history for a specific customer user
 * @param {string} userId - User ObjectId
 * @returns {Promise<Array>}
 */
export const getUserOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
};

/**
 * Find single order by human-readable orderId (e.g. ZL-839201) or ObjectId
 * @param {string} identifier
 * @returns {Promise<Object>}
 */
export const findOrderById = async (identifier) => {
  if (!identifier) return null;

  let order = await Order.findOne({ orderId: identifier.toUpperCase().trim() }).lean();
  if (order) return order;

  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    order = await Order.findById(identifier).lean();
  }

  return order;
};

export default {
  processOrderCreation,
  getUserOrders,
  findOrderById
};
