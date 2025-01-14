import {createSlice} from '@reduxjs/toolkit';
import {getAvailability} from './getAvailability';

const initialState: any = {
  availability: null,
  tempId: null,
  error: null,
  loading: false,
};

const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {
    setAvailability: (state, {payload}) => {
      state.availability = payload;
    },
    setTempId: (state, {payload}) => {
      state.tempId = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getAvailability.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailability.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.availability = payload.data;
      })
      .addCase(getAvailability.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {setAvailability, setTempId} = availabilitySlice.actions;
export default availabilitySlice.reducer;
