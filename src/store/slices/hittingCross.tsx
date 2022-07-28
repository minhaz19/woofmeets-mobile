import {createSlice} from '@reduxjs/toolkit';

export const hittingCross = createSlice({
  name: 'cross',
  initialState: {cross: false},
  reducers: {
    setCross: (state, action) => {
      state.cross = action.payload;
    },
  },
});
export const {setCross} = hittingCross.actions;

export default hittingCross.reducer;
