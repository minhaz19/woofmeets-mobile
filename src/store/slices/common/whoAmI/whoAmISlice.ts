import {createSlice} from '@reduxjs/toolkit';
import {getWhoAmI} from './whoAmIAction';

const initialState: any = {
  userid: null,
  user: null,
  error: null,
  loading: false,
};

const whoAmISlice = createSlice({
  name: 'whoami',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getWhoAmI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWhoAmI.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload.data;
        state.userId = payload.data?.id;
      })
      .addCase(getWhoAmI.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default whoAmISlice.reducer;
