import {createSlice} from '@reduxjs/toolkit';

export const trackingToggle = createSlice({
  name: 'trackingStatus',
  initialState: {
    trackingStatus: false,
    reset: false,
    timee: {hours: 0, minutes: 0, seconds: 0},
    distance: 0,
    coordinates: [{latitude: 0, longitude: 0}],
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
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});
export const {setTrackingStatus, setCoordinates, setTimee, setDistance, setReset} =
  trackingToggle.actions;

export default trackingToggle.reducer;
