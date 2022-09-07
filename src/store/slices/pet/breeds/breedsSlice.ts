import {createSlice} from '@reduxjs/toolkit';
import {getBreeds} from './breedsAction';

const initialState: any = {
  catBreeds: null,
  dogBreeds: null,
  error: null,
  loading: false,
};

const breedsSlice = createSlice({
  name: 'petBreeds',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getBreeds.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBreeds.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.catBreeds =
          payload.data?.catBreeds &&
          payload.data.catBreeds.map((item: any) => {
            return {label: item.name, value: item.id};
          });

        state.dogBreeds =
          payload.data?.dogBreeds &&
          payload.data.dogBreeds.map((item: any) => {
            return {label: item.name, value: item.id};
          });
      })
      .addCase(getBreeds.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default breedsSlice.reducer;
