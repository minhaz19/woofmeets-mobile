import {createSlice} from '@reduxjs/toolkit';
import {getUserCanceled} from './getUserCancelled';

const initialState: any = {
  userCancelled: null,
  error: null,
  loading: false,
};

const useAppointmentCancelSlice = createSlice({
  name: 'userCancelled',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserCanceled.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCanceled.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userCancelled = payload.data;
      })
      .addCase(getUserCanceled.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default useAppointmentCancelSlice.reducer;
