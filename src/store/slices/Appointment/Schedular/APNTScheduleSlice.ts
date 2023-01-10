import {createSlice} from '@reduxjs/toolkit';
import {getOnGoingAPNT, getPastAPNT, getUpCommingAPNT} from './getAPNTSchedule';

const initialState: any = {
  onGoingAppointment: null,
  upCommingAppointment: null,
  pastAppointment: null,
  error: null,
  loading: false,
};

const APNTscheduleSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getOnGoingAPNT.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnGoingAPNT.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.onGoingAppointment = payload.data;
      })
      .addCase(getOnGoingAPNT.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUpCommingAPNT.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpCommingAPNT.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.upCommingAppointment = payload.data;
      })
      .addCase(getUpCommingAPNT.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getPastAPNT.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPastAPNT.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.pastAppointment = payload.data;
      })
      .addCase(getPastAPNT.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default APNTscheduleSlice.reducer;
