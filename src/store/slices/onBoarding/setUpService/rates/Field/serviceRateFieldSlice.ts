import {createSlice} from '@reduxjs/toolkit';
import {getServiceRateFields} from './serviceRateFieldAction';

const initialState: any = {
  serviceData: null,
  serviceRateFields: null,
  ratesMeta: null,
  error: null,
  loading: false,
};

const serviceRateFieldSlice = createSlice({
  name: 'serviceRates',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getServiceRateFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceRateFields.fulfilled, (state, {payload}) => {
        const findIndex = payload.data.findIndex(
          (item: any) => item.serviceRateType.slug === 'base-rate',
        );
        payload.data.splice(0, 0, payload.data.splice(findIndex, 1)[0]);
        state.loading = false;
        state.serviceData = payload.data;
        state.ratesMeta = payload.data.filter(
          (item: any) => item.serviceRateType.slug === 'base-rate',
        )[0].ServiceType.meta;
        state.serviceRateFields = payload.data?.map((item: any) => ({
          ...item.serviceRateType,
          rateId: item.id,
          rateUnitLabel: item.ServiceType.unitlabel,
          percentage: payload.data.filter(
            (it: any) => it.serviceRateType.slug === 'base-rate',
          )[0].ServiceType.meta[`${item.serviceRateType.slug}`],
        }));
      })
      .addCase(getServiceRateFields.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default serviceRateFieldSlice.reducer;