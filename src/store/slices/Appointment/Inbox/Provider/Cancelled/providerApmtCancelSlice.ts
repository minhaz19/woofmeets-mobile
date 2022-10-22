import {createSlice} from '@reduxjs/toolkit';
import {getProviderCancelled} from './getProviderCancelled';

const initialState: any = {
  providerCancelled: null,
  error: null,
  loading: false,
};

const providerApntCancelSlice = createSlice({
  name: 'providerCancelled',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderCancelled.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderCancelled.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerCancelled = payload.data;
      })
      .addCase(getProviderCancelled.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerApntCancelSlice.reducer;
