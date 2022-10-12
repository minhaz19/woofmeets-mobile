import {createSlice} from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    currentUserLocation: null,
  },
  reducers: {
    saveCurrentUserLocation: (state, action) => {
      state.currentUserLocation = action.payload.currentUserLocation;
    },
  },
  extraReducers(builder) {},
});
export const {
  saveCurrentUserLocation,
} = addressSlice.actions;

export default addressSlice.reducer;
