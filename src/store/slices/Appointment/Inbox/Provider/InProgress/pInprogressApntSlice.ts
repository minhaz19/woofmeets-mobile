import {createSlice} from '@reduxjs/toolkit';
import {getProviderInprogressApnt} from './getPInprogressApnt';

const initialState: any = {
  providerInprogress: null,
  error: null,
  loading: false,
};

const completedApntSlice = createSlice({
  name: 'providerInprogress',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderInprogressApnt.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderInprogressApnt.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerInprogress = payload.data;
      })
      .addCase(getProviderInprogressApnt.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default completedApntSlice.reducer;
