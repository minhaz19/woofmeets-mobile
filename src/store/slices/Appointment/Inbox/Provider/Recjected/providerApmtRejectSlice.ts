import {createSlice} from '@reduxjs/toolkit';
import {getProviderRejected} from './getProviderRejected';

const initialState: any = {
  providerRejected: null,
  error: null,
  loading: false,
};

const providerAppointmentRejectSlice = createSlice({
  name: 'providerRejected',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderRejected.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderRejected.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerRejected = payload.data;
      })
      .addCase(getProviderRejected.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerAppointmentRejectSlice.reducer;
