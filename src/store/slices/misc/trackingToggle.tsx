import {createSlice} from '@reduxjs/toolkit';

export const trackingToggle = createSlice({
  name: 'trackingStatus',
  initialState: {trackingStatus: false, timee: 0},
  reducers: {
    setTrackingStatus: (state, action) => {
      state.trackingStatus = action.payload;
    },
    setTimee: (state, action) => {
      state.timee = action.payload;
    },
  },
});
export const {setTrackingStatus, setTimee} = trackingToggle.actions;

export default trackingToggle.reducer;
