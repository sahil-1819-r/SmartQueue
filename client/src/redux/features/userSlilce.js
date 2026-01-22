import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
