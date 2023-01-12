import {createSlice} from '@reduxjs/toolkit';
import {getUserAPNTList} from './getUserAPNTList';

const initialState: any = {
  userAppointment: null,
  error: null,
  loading: false,
};

const userAPNTLIstSlice = createSlice({
  name: 'userAppointment',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserAPNTList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAPNTList.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userAppointment = payload.data;
      })
      .addCase(getUserAPNTList.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default userAPNTLIstSlice.reducer;
