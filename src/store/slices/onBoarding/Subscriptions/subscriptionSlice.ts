import {createSlice} from '@reduxjs/toolkit';
import {getSubscription} from './subscriptionAction';

const initialState: any = {
  plans: null,
  error: null,
  loading: false,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getSubscription.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscription.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.plans = payload.data;
      })
      .addCase(getSubscription.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default subscriptionSlice.reducer;
