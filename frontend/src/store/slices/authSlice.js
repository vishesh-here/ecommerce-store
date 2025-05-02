import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Load token from localStorage
const token = localStorage.getItem('token');

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await api.login(credentials);
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await api.register(userData);
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const response = await api.getCurrentUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token,
    isAuthenticated: !!token,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;