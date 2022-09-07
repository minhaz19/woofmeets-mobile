import {createSlice} from '@reduxjs/toolkit';
import {getPetGallery} from './petGalleryAction';

const initialState: any = {
  petGallery: null,
  error: null,
  loading: false,
};

const petGallerySlice = createSlice({
  name: 'petGallery',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getPetGallery.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPetGallery.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.petGallery = payload.data;
      })
      .addCase(getPetGallery.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default petGallerySlice.reducer;
