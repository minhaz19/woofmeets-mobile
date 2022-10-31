import {createSlice} from '@reduxjs/toolkit';
import {getInprogressApnt} from './getInprogressApnt';

const initialState: any = {
  userInprogress: null,
  error: null,
  loading: false,
};

const completedApntSlice = createSlice({
  name: 'userInprogress',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getInprogressApnt.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInprogressApnt.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userInprogress = payload.data;
      })
      .addCase(getInprogressApnt.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default completedApntSlice.reducer;
