import {createSlice} from '@reduxjs/toolkit';

export const markedStyle = createSlice({
  name: 'markedStyle',
  initialState: {markedStyle: {}},
  reducers: {
    storeMarkStyle: (state, action) => {
      state.markedStyle = action.payload;
    },
  },
});
export const {storeMarkStyle} = markedStyle.actions;

export default markedStyle.reducer;
