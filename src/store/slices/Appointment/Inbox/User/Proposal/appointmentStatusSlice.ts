import {createSlice} from '@reduxjs/toolkit';
import {getAppointmentStatus} from './getAppointmentStatus';

const initialState: any = {
  appointmentStatus: null,
  error: null,
  loading: false,
};

const statusProposalSlice = createSlice({
  name: 'appointmentStatus',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAppointmentStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentStatus.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.appointmentStatus = payload.data;
      })
      .addCase(getAppointmentStatus.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default statusProposalSlice.reducer;
