import Product from '../models/Product.js';

/**
 * Query products with category filter, search keyword, sorting, and pagination
 */
export const queryProducts = async (queryParams = {}) => {
  const {
    category,
    search,
    featured,
    sortBy = 'featured',
    page = 1,
    limit = 24
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

  // Search keyword (matches name, description, flavorNotes, origin, subregion)
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { flavorNotes: { $in: [searchRegex] } },
      { origin: searchRegex },
      { subregion: searchRegex },
      { category: searchRegex }
    ];
  }

  // Sorting logic (supports both 'price-asc'/'price_asc' and 'price-desc'/'price_desc')
  let sortOption = {};
  switch (sortBy) {
    case 'price-asc':
    case 'price_asc':
      sortOption = { 'variants.0.price': 1, _id: 1 };
      break;
    case 'price-desc':
    case 'price_desc':
      sortOption = { 'variants.0.price': -1, _id: 1 };
      break;
    case 'rating':
      sortOption = { rating: -1, reviewsCount: -1 };
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
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
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
 * Find single product by MongoDB _id, custom id, or slug
 */
export const findProductByIdOrSlug = async (identifier) => {
  if (!identifier) return null;

  let product = null;

  // 1. Try matching custom id (e.g. "zen-01")
  product = await Product.findOne({ id: identifier }).lean();
  if (product) return product;

  // 2. Try matching MongoDB ObjectId
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(identifier).lean();
    if (product) return product;
  }

  // 3. Fallback to matching by slug
  product = await Product.findOne({ slug: identifier.toLowerCase().trim() }).lean();
  return product;
};

/**
 * Get all available categories along with live product counts
 */
export const getCategoryCounts = async () => {
  const CATEGORIES = [
    'All',
    'Green & Matcha',
    'Black & Oolong',
    'Herbal & Infusions',
    'Tea Ware & Gifts'
  ];

  const totalAll = await Product.countDocuments();
  const counts = { All: totalAll };

  await Promise.all(
    CATEGORIES.filter((c) => c !== 'All').map(async (cat) => {
      counts[cat] = await Product.countDocuments({ category: cat });
    })
  );

  return {
    categories: CATEGORIES,
    counts
  };
};

export default {
  queryProducts,
  findProductByIdOrSlug,
  getCategoryCounts
};
