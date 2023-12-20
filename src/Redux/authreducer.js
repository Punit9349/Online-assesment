import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userDetails: null,
  // Add more initial state properties as needed
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
  },
});

export const {authenticateUser} = auth.actions;
export default auth.reducer;