import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assessment: null,
  answers: {},
  email: '',
  submitted: false,
  results: null,
  timer: 480,
  currentQuestion: 0,
  hasTakenAssessment: false,
};

const takeAssessmentSlice = createSlice({
  name: 'takeAssessment',
  initialState,
  reducers: {
    setAssessment: (state, action) => {
      state.assessment = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setHasTakenAssessment: (state, action) => {
      state.hasTakenAssessment = action.payload;
    },
    // Add other actions as needed
  },
});

export const {
  setAssessment,
  setAnswers,
  setEmail,
  setSubmitted,
  setResults,
  setTimer,
  setCurrentQuestion,
  setHasTakenAssessment,
} = takeAssessmentSlice.actions;

export default takeAssessmentSlice.reducer;
