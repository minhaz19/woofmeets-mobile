import {createSlice} from '@reduxjs/toolkit';
import {getUserRejected} from './getUserRejected';

const initialState: any = {
  userRejected: null,
  error: null,
  loading: false,
};

const useAppointmentRejectSlice = createSlice({
  name: 'userRejected',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserRejected.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRejected.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userRejected = payload.data;
      })
      .addCase(getUserRejected.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default useAppointmentRejectSlice.reducer;
