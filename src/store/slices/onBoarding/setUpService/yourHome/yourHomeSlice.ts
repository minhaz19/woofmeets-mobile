import {createSlice} from '@reduxjs/toolkit';
import {getYourHome} from './getYourHome';

const initialState: any = {
  yourHome: null,
  error: null,
  loading: false,
};

const yourHomeSlice = createSlice({
  name: 'yourHome',
  initialState,
  reducers: {
    setYourHome: (state, {payload}) => {
      state.yourHome = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getYourHome.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYourHome.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.yourHome = payload.data;
      })
      .addCase(getYourHome.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {setYourHome} = yourHomeSlice.actions;
export default yourHomeSlice.reducer;
