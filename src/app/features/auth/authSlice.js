import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");
const initialState = {
  user: user ? JSON.parse(user) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
