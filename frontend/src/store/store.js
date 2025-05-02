import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    user: userReducer,
  },
});

export default store;