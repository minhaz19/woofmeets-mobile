import {createSlice} from '@reduxjs/toolkit';
import {getProviderAPNTList} from './getProviderAPNTList';

const initialState: any = {
  providerAppointment: null,
  error: null,
  loading: false,
};

const providerAPNTLIstSlice = createSlice({
  name: 'providerAppointment',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderAPNTList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderAPNTList.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerAppointment = payload.data;
      })
      .addCase(getProviderAPNTList.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerAPNTLIstSlice.reducer;
