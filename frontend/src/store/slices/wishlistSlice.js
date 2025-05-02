import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId) => {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`);
    return response.data;
  }
);

export const toggleWishlistItem = createAsyncThunk(
  'wishlist/toggleItem',
  async ({ userId, productId }) => {
    const response = await axios.post(`${API_URL}/wishlist/toggle`, {
      userId,
      productId,
    });
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;