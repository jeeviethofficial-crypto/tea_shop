/**
 * Authoritative Coupon & Promotion Service
 */
export const AVAILABLE_COUPONS = {
  ZEN15: {
    code: 'ZEN15',
    discountPercent: 15,
    description: '15% Off Your First Micro-Lot Harvest',
    minSubtotal: 0
  },
  HARVEST10: {
    code: 'HARVEST10',
    discountPercent: 10,
    description: '10% Seasonal Harvest Discount',
    minSubtotal: 0
  },
  FIRSTSIP: {
    code: 'FIRSTSIP',
    discountPercent: 20,
    description: '20% Welcome to Mindful Tea Rituals',
    minSubtotal: 30
  },
  MATCHA25: {
    code: 'MATCHA25',
    discountPercent: 25,
    description: '25% Special Ceremonial Matcha Connoisseur Discount',
    minSubtotal: 50
  }
};

/**
 * Validate coupon code against subtotal
 * @param {string} code
 * @param {number} subtotal
 * @returns {Object} validation result
 */
export const validateCoupon = (code, subtotal = 0) => {
  if (!code || typeof code !== 'string') {
    return {
      valid: false,
      code: '',
      discountPercent: 0,
      message: 'Please provide a promo code.'
    };
  }

  const normalized = code.trim().toUpperCase();
  const coupon = AVAILABLE_COUPONS[normalized];

  if (!coupon) {
    return {
      valid: false,
      code: normalized,
      discountPercent: 0,
      message: `Invalid coupon code "${normalized}".`
    };
  }

  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      code: normalized,
      discountPercent: 0,
      message: `Code "${normalized}" requires a minimum order of $${coupon.minSubtotal}.`
    };
  }

  const discountAmount = Math.round(((subtotal * coupon.discountPercent) / 100) * 100) / 100;

  return {
    valid: true,
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount,
    description: coupon.description,
    message: `Applied ${coupon.discountPercent}% discount (${coupon.code})`
  };
};

export default {
  AVAILABLE_COUPONS,
  validateCoupon
};

