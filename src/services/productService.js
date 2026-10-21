import Product from '../models/Product.js';

/**
 * Query products with category filter, search keyword, sorting, and pagination
 */
export const queryProducts = async (queryParams) => {
  const {
    category,
    search,
    featured,
    sort = 'featured',
    page = 1,
    limit = 12
  } = queryParams;

  const filter = {};

  // Category filter
  if (category && category !== 'All') {
    filter.category = category;
  }

  // Featured filter
  if (featured === 'true' || featured === true) {
    filter.isFeatured = true;
  }

  // Search keyword (matches title, tasting notes, or country)
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { title: searchRegex },
      { tastingNotes: { $in: [searchRegex] } },
      { 'origin.country': searchRegex },
      { 'origin.region': searchRegex }
    ];
  }

  // Sorting logic
  let sortOption = {};
  switch (sort) {
    case 'price_asc':
      sortOption = { 'variants.0.price': 1, _id: 1 };
      break;
    case 'price_desc':
      sortOption = { 'variants.0.price': -1, _id: 1 };
      break;
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    case 'featured':
    default:
      sortOption = { isFeatured: -1, createdAt: -1 };
      break;
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
  const skip = (pageNum - 1) * limitNum;

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(filter)
  ]);

  return {
    products,
    pagination: {
      total: totalCount,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalCount / limitNum)
    }
  };
};

/**
 * Find single product by either ObjectId or slug
 */
export const findProductByIdOrSlug = async (identifier) => {
  let product = null;

  // Check if identifier is a valid MongoDB ObjectId
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(identifier);
  }

  // Fallback to finding by slug
  if (!product) {
    product = await Product.findOne({ slug: identifier.toLowerCase() });
  }

  return product;
};

export default {
  queryProducts,
  findProductByIdOrSlug
};
