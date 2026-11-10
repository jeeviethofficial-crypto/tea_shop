import Product from '../models/Product.js';

/**
 * Recommend tea based on quiz responses
 * @param {Object} answers - { time: 'morning'|'afternoon'|'evening', taste: 'umami'|'roasted'|'floral', ritual: 'whisk'|'steep'|'infuser' }
 * @returns {Promise<Object>} matched product and recommendation rationale
 */
export const getTeaRecommendation = async (answers = {}) => {
  const { time, taste, ritual } = answers;

  let querySlug = 'ceremonial-grade-uji-matcha';
  let matchReason = 'Perfect match for morning clarity and mindful ceremonial whisking.';

  if (ritual === 'whisk' || taste === 'umami') {
    if (time === 'afternoon') {
      querySlug = 'imperial-gyokuro-shade-grown';
      matchReason = 'Shade-grown Gyokuro delivers profound oceanic umami and sustained afternoon calm.';
    } else {
      querySlug = 'ceremonial-grade-uji-matcha';
      matchReason = 'Stone-ground Uji tencha offers rich creamy froth and clean morning L-theanine alertness.';
    }
  } else if (time === 'evening' || taste === 'floral') {
    querySlug = 'himalayan-organic-chamomile-lavender';
    matchReason = 'Naturally caffeine-free Himalayan botanicals for restorative twilight serenity.';
  } else if (taste === 'roasted' || time === 'afternoon') {
    querySlug = 'wuyi-cliff-da-hong-pao-oolong';
    matchReason = 'Zhengyan volcanic rock cliff oolong with charcoal longan wood warmth and honey notes.';
  } else if (time === 'morning') {
    querySlug = 'nuwara-eliya-high-grown-ceylon';
    matchReason = 'Crisp montane cloud forest single-estate black tea with bright wildflower honey finish.';
  }

  // Look up product from database
  let product = await Product.findOne({ slug: querySlug }).lean();

  if (!product) {
    product = await Product.findOne().lean();
  }

  return {
    recommendedProduct: product,
    rationale: matchReason,
    matchCategory: product?.category || 'Green & Matcha'
  };
};

export default {
  getTeaRecommendation
};

