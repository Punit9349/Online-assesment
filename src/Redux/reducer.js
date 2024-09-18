import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assessments: [],
  assessmentState: {
    assessmentName: '',
    assessmentDate: '',
    assessmentTime: '',
    allowedEmails: '',
    questions: [],
    newQuestion: {
      text: '',
      options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      correctAnswer: 0,
    },
  },
  // Add more initial state properties as needed
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAssessments: (state, action) => {
      state.assessments = action.payload;
    },

    setAssessmentState: (state, action) => {
      state.assessmentState = action.payload;
    },

    resetAssessmentState: (state) => {
      // Reset assessment state to initial values
      state.assessmentState = initialState.assessmentState;
    },
    // Add more reducer functions as needed
  },
});

export const { setAssessments, setAssessmentState, resetAssessmentState } = user.actions;
export default user.reducer;