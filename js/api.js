// KAYA — Backend API Integration

const API_BASE_URL = 'http://localhost:3000';

// ==================== AUTH API FUNCTIONS ====================

async function apiRegister(email, password, name) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Registration failed');

    // Save token and user data
    localStorage.setItem('kaya_token', data.token);
    localStorage.setItem('bonkers_user', JSON.stringify(data.user));

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: error.message };
  }
}

async function apiLogin(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Login failed');

    // Save token and user data
    localStorage.setItem('kaya_token', data.token);
    localStorage.setItem('bonkers_user', JSON.stringify(data.user));

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

async function apiForgotPassword(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to send reset email');

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false, error: error.message };
  }
}

async function apiGetUser() {
  const token = localStorage.getItem('kaya_token');

  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      // Token expired or invalid
      localStorage.removeItem('kaya_token');
      localStorage.removeItem('bonkers_user');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

async function apiLogout() {
  localStorage.removeItem('kaya_token');
  localStorage.removeItem('bonkers_user');
  window.location.href = 'index.html';
}

// ==================== ORDERS API FUNCTIONS ====================

async function apiCreateOrder(items, total, shippingAddress, paymentMethod) {
  const token = localStorage.getItem('kaya_token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items, total, shippingAddress, paymentMethod })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Order creation failed');

    return { success: true, order: data.order };
  } catch (error) {
    console.error('Create order error:', error);
    return { success: false, error: error.message };
  }
}

async function apiGetOrders() {
  const token = localStorage.getItem('kaya_token');

  if (!token) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.error('Get orders error:', error);
    return [];
  }
}

async function apiGetOrder(orderId) {
  const token = localStorage.getItem('kaya_token');

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error('Get order error:', error);
    return null;
  }
}

// ==================== PRODUCTS API FUNCTIONS ====================

async function apiGetProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Get products error:', error);
    // Fallback to static data
    return PRODUCTS;
  }
}

// ==================== HELPER FUNCTIONS ====================

function isAuthenticated() {
  return !!localStorage.getItem('kaya_token');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('bonkers_user') || 'null');
}

function getAuthToken() {
  return localStorage.getItem('kaya_token');
}

// Export functions globally
window.apiAuth = {
  register: apiRegister,
  login: apiLogin,
  forgotPassword: apiForgotPassword,
  getUser: apiGetUser,
  logout: apiLogout,
  isAuthenticated,
  getCurrentUser,
  getAuthToken
};

window.apiOrders = {
  createOrder: apiCreateOrder,
  getOrders: apiGetOrders,
  getOrder: apiGetOrder
};
