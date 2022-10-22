import {createSlice} from '@reduxjs/toolkit';
import {getProviderApnt} from './getProviderApnt';

const initialState: any = {
  providerApntStatus: null,
  error: null,
  loading: false,
};

const providerApntStatusSlice = createSlice({
  name: 'providerApntStatus',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderApnt.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderApnt.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerApntStatus = payload.data;
      })
      .addCase(getProviderApnt.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerApntStatusSlice.reducer;
