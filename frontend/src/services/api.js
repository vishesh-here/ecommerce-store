import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);

// Categories
export const getCategories = () => api.get('/categories');

// Banners
export const getBanners = () => api.get('/banners');

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => 
  api.post('/cart', { productId, quantity });
export const updateCartItem = (productId, quantity) =>
  api.put('/cart', { productId, quantity });
export const removeFromCart = (productId) =>
  api.delete(`/cart/${productId}`);

// Wishlist
export const getWishlist = () => api.get('/wishlist');
export const toggleWishlistItem = (productId) =>
  api.post('/wishlist/toggle', { productId });

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);

// Address
export const getAddresses = () => api.get('/addresses');
export const addAddress = (addressData) => api.post('/addresses', addressData);
export const updateAddress = (addressId, addressData) =>
  api.put(`/addresses/${addressId}`, addressData);
export const deleteAddress = (addressId) =>
  api.delete(`/addresses/${addressId}`);

// Auth
export const login = (credentials) => api.post('/users/login', credentials);
export const register = (userData) => api.post('/users/register', userData);
export const getCurrentUser = () => api.get('/users/me');

export default api;