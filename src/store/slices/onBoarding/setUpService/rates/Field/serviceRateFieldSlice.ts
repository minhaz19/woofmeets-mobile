import {createSlice} from '@reduxjs/toolkit';
import {getServiceRateFields} from './serviceRateFieldAction';

const initialState: any = {
  serviceData: null,
  serviceRateFields: null,
  error: null,
  loading: false,
};

const serviceRateFieldSlice = createSlice({
  name: 'serviceRates',
  initialState,
  reducers: {
  },

  extraReducers(builder) {
    builder
      .addCase(getServiceRateFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceRateFields.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.serviceData = payload.data;
        state.serviceRateFields = payload.data?.map(
          (item: any) => item.serviceRateType,
        );
      })
      .addCase(getServiceRateFields.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default serviceRateFieldSlice.reducer;
