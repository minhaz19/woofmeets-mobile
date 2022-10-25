import {createSlice} from '@reduxjs/toolkit';
import {getProviderAccepted} from './getProviderAcceptedStatus';

const initialState: any = {
  providerAccepted: null,
  error: null,
  loading: false,
};

const providerAcceptedSlice = createSlice({
  name: 'providerAccepted',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderAccepted.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderAccepted.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerAccepted = payload.data;
      })
      .addCase(getProviderAccepted.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerAcceptedSlice.reducer;
