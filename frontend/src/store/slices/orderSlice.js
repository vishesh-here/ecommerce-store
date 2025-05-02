import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    const response = await api.createOrder(orderData);
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await api.getOrders();
    return response.data;
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId) => {
    const response = await api.getOrderById(orderId);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    currentOrder: null,
    pastOrders: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
        state.pastOrders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pastOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Fetch single order
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;