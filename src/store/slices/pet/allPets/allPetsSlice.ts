import {createSlice} from '@reduxjs/toolkit';
import {getAllPets} from './allPetsAction';

const initialState: any = {
  pets: null,
  error: null,
  loading: false,
};

const allPetSlice = createSlice({
  name: 'allPets',
  initialState,
  reducers: {
    updatePets: state => {
      state.pets = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getAllPets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPets.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.pets = payload.data;
      })
      .addCase(getAllPets.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {updatePets} = allPetSlice.actions;

export default allPetSlice.reducer;
