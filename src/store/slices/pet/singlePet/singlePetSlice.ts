import {createSlice} from '@reduxjs/toolkit';
import {getSinglePet} from './signlePetAction';

const initialState: any = {
  singlePet: null,
  error: null,
  loading: false,
};

const signlePetSlice = createSlice({
  name: 'singlePet',
  initialState,
  reducers: {
    removeSinglePet: state => {
      state.singlePet = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getSinglePet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglePet.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.singlePet = payload.data;
      })
      .addCase(getSinglePet.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {removeSinglePet} = signlePetSlice.actions;
export default signlePetSlice.reducer;
