import {createSlice} from '@reduxjs/toolkit';
import {getPetPreference} from './getPetPreference';

const initialState: any = {
  petPreference: null,
  petPerDay: 1,
  error: null,
  loading: false,
};

const petPreferenceSlice = createSlice({
  name: 'petPreference',
  initialState,
  reducers: {
    increment: state => {
      state.petPerDay += 1;
    },
    decrement: state => {
      if (state.petPerDay > 1) {
        state.petPerDay -= 1;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getPetPreference.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPetPreference.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.petPreference = payload.data;
        state.petPerDay = payload?.data?.petPerDay
          ? payload?.data?.petPerDay
          : 1;
      })
      .addCase(getPetPreference.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {increment, decrement} = petPreferenceSlice.actions;
export default petPreferenceSlice.reducer;
