import {createSlice} from '@reduxjs/toolkit';

export const trackingToggle = createSlice({
  name: 'trackingStatus',
  initialState: {
    trackingStatus: false,
    reset: false,
    timee: {hours: 0, minutes: 0, seconds: 0},
  },
  reducers: {
    setTrackingStatus: (state, action) => {
      state.trackingStatus = action.payload;
    },
    setTimee: (state, action) => {
      state.timee = action.payload;
    },
    setReset: (state, action) => {
      state.reset = action.payload;
    },
  },
});
export const {setTrackingStatus, setTimee, setReset} = trackingToggle.actions;

export default trackingToggle.reducer;
