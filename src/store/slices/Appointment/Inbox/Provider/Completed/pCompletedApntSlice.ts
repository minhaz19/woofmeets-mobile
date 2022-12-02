import {createSlice} from '@reduxjs/toolkit';
import {getProviderCompletedApnt} from './getPCompletedApnt';

const initialState: any = {
  providerCompleted: null,
  error: null,
  loading: false,
};

const providerCompletedApntSlice = createSlice({
  name: 'providerCompleted',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderCompletedApnt.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderCompletedApnt.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerCompleted = payload.data;
      })
      .addCase(getProviderCompletedApnt.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerCompletedApntSlice.reducer;
