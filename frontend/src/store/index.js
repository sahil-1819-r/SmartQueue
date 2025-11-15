import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orgReducer from './slices/orgSlice';
import queueReducer from './slices/queueSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    org: orgReducer,
    queue: queueReducer,
  },
});

export default store;

