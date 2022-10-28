import {createSlice} from '@reduxjs/toolkit';
import {getRateFieldValue} from './rateFieldValueAction';

const initialState: any = {
  fieldsData: null,
  fieldValue: null,
  error: null,
  loading: false,
};

const serviceRateFieldSlice = createSlice({
  name: 'fieldValue',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getRateFieldValue.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRateFieldValue.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.fieldValue = payload.data?.map(
          (item: {
            id: number;
            amount: number;
            serviceTypeRate: {serviceRateTypeId: number};
          }) => {
            // const c = payload?.data.find(
            //   (it: any) =>
            //     it?.serviceTypeRate?.serviceRateTypeId ===
            //     item?.serviceTypeRate?.serviceRateTypeId,
            // )?.serviceTypeRate?.serviceRateTypeId;
            // console.log('check', c);
            return {
              id: item.id,
              modRatesId: payload?.data.find(
                (it: any) =>
                  it?.serviceTypeRate?.serviceRateTypeId ===
                  item?.serviceTypeRate?.serviceRateTypeId,
              )?.serviceTypeRate?.serviceRateTypeId,
              amount: item.amount,
            };
          },
        );
      })
      .addCase(getRateFieldValue.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default serviceRateFieldSlice.reducer;
