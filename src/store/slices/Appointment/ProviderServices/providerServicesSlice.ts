import {createSlice} from '@reduxjs/toolkit';
import {getProviderServices} from './getProviderServices';

const initialState: any = {
  providerServices: null,
  error: null,
  loading: false,
};

const providerServicesSlice = createSlice({
  name: 'providerServices',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderServices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderServices.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerServices = payload?.data?.filter(
          (item: any) =>
            item.isActive === true && item.AvailableDay.length !== 0,
        );
      })
      .addCase(getProviderServices.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerServicesSlice.reducer;
