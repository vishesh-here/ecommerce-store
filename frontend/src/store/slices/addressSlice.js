import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async () => {
    const response = await api.getAddresses();
    return response.data;
  }
);

export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (addressData) => {
    const response = await api.addAddress(addressData);
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, ...addressData }) => {
    const response = await api.updateAddress(id, addressData);
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId) => {
    await api.deleteAddress(addressId);
    return addressId;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Add address
      .addCase(addAddress.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      
      // Update address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.items.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      
      // Delete address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.items = state.items.filter(addr => addr.id !== action.payload);
      });
  },
});

export default addressSlice.reducer;