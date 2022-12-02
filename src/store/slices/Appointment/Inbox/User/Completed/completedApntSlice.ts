import {createSlice} from '@reduxjs/toolkit';
import {getCompletedApnt} from './getCompletedApnt';

const initialState: any = {
  userCompleted: null,
  error: null,
  loading: false,
};

const completedApntSlice = createSlice({
  name: 'userCompleted',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getCompletedApnt.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompletedApnt.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userCompleted = payload.data;
      })
      .addCase(getCompletedApnt.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default completedApntSlice.reducer;
