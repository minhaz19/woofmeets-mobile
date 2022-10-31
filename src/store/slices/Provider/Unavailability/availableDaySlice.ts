import {createSlice} from '@reduxjs/toolkit';
import {getAvailableDays} from './getAvailableDay';

const initialState: any = {
  serviceDays: [],
  error: null,
  loading: false,
};

const availabilityDaysSlice = createSlice({
  name: 'serviceDays',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAvailableDays.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableDays.fulfilled, (state, {payload}) => {
        state.serviceDays = payload.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAvailableDays.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default availabilityDaysSlice.reducer;
