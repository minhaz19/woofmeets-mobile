import {createSlice} from '@reduxjs/toolkit';
import {getAllProvider} from './getAllProvider';

const initialState: any = {
  allProvider: null,
  error: null,
  loading: false,
};

const allProviderSlice = createSlice({
  name: 'allProvider',
  initialState,
  reducers: {
    // setAllProvider: (state, {payload}) => {
    //   state.allProvider = payload;
    // },
  },

  extraReducers(builder) {
    builder
      .addCase(getAllProvider.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProvider.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.allProvider = payload;
      })
      .addCase(getAllProvider.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
// export const {setAllProvider} = allProviderSlice.actions;
export default allProviderSlice.reducer;
