import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  registerOrg,
  registerUser,
} from '../../services/authService';

const tokenKey = 'smartqueue_token';
const userKey = 'smartqueue_user';

const persistSession = (token, user) => {
  if (token) localStorage.setItem(tokenKey, token);
  if (user) localStorage.setItem(userKey, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

const initialState = {
  user: JSON.parse(localStorage.getItem(userKey) || 'null'),
  token: localStorage.getItem(tokenKey),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (payload) => {
  const response = await login(payload);
  return response.data;
});

export const registerUserAccount = createAsyncThunk(
  'auth/registerUser',
  async (payload) => {
    const response = await registerUser(payload);
    return response.data;
  }
);

export const registerOrgAccount = createAsyncThunk(
  'auth/registerOrg',
  async (payload) => {
    const response = await registerOrg(payload);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      clearSession();
    },
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      persistSession(state.token, state.user);
    },
  },
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      persistSession(state.token, state.user);
    };

    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };

    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    };

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected)
      .addCase(registerUserAccount.pending, pending)
      .addCase(registerUserAccount.fulfilled, fulfilled)
      .addCase(registerUserAccount.rejected, rejected)
      .addCase(registerOrgAccount.pending, pending)
      .addCase(registerOrgAccount.fulfilled, fulfilled)
      .addCase(registerOrgAccount.rejected, rejected);
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

