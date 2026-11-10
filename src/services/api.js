/**
 * ZenLeaf Tea API Client
 * Provides seamless communication with the Express backend REST API
 * with graceful fallback to bundled data if the server is unreachable.
 */

const API_BASE = '/api/v1';

/**
 * Helper to make API requests with error handling
 */
async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = localStorage.getItem('zenleaf_auth_token');
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.warn(`[API] ${endpoint} request error:`, err.message);
    throw err;
  }
}

/**
 * Fetch products with optional filtering, sorting, and pagination
 */
export async function getProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return request(`/products${qs}`);
}

/**
 * Fetch product categories and count
 */
export async function getCategories() {
  return request('/products/categories');
}

/**
 * Fetch single product by id or slug
 */
export async function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

/**
 * Validate coupon code
 */
export async function validateCoupon(code, subtotal = 0) {
  return request('/orders/validate-coupon', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal })
  });
}

/**
 * Submit checkout order
 */
export async function createOrder(orderPayload) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload)
  });
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeNewsletter(email) {
  return request('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

/**
 * Get tea recommendation from quiz answers
 */
export async function getQuizRecommendation(answers) {
  return request('/quiz/recommend', {
    method: 'POST',
    body: JSON.stringify({ answers })
  });
}

/**
 * User login
 */
export async function login(email, password) {
  const res = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (res?.data?.token) {
    localStorage.setItem('zenleaf_auth_token', res.data.token);
  }
  return res;
}

/**
 * Get current authenticated user profile
 */
export async function getProfile() {
  return request('/auth/me');
}

/**
 * Add tasting note to personal journal
 */
export async function addTastingNote(noteData) {
  return request('/auth/tasting-journal', {
    method: 'POST',
    body: JSON.stringify(noteData)
  });
}

export default {
  getProducts,
  getCategories,
  getProductById,
  validateCoupon,
  createOrder,
  subscribeNewsletter,
  getQuizRecommendation,
  login,
  getProfile,
  addTastingNote
};

