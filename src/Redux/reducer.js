import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assessments: [],
  isAuthenticated: false,
  userDetails: null,
  // Add more initial state properties as needed
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAssessments: (state, action) => {
      state.assessments = action.payload;
    },
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userDetails = null;
    },
    // Add more reducer functions as needed
  },
});

export const { setAssessments, authenticateUser, logoutUser } = user.actions;
export default user.reducer;

  