import {createSlice} from '@reduxjs/toolkit';
import {getSafetyQuiz} from './satetyQuizAction';

const initialState: any = {
  quiz: null,
  error: null,
  loading: false,
};

const safetyQuizSlice = createSlice({
  name: 'safetyQuiz',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getSafetyQuiz.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSafetyQuiz.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.quiz = payload.data;
      })
      .addCase(getSafetyQuiz.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default safetyQuizSlice.reducer;
