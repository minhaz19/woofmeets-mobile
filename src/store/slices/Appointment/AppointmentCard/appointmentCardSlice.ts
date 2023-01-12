import {createSlice} from '@reduxjs/toolkit';
import {getAppointmentCard} from './getAppointmentCard';

const initialState: any = {
  appointmentCard: null,

  error: null,
  loading: false,
};

const proposalPricingSlice = createSlice({
  name: 'appointmentCard',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAppointmentCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentCard.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.appointmentCard = payload.data;
      })
      .addCase(getAppointmentCard.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default proposalPricingSlice.reducer;
