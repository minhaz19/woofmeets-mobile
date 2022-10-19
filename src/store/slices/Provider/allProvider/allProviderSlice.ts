import {createSlice} from '@reduxjs/toolkit';
import {getAllProvider, getAllProviderOneTime} from './getAllProvider';

const initialState: any = {
  allProvider: [],
  message: '',
  error: null,
  loading: false,
};

const allProviderSlice = createSlice({
  name: 'allProvider',
  initialState,
  reducers: {
    // setAllProvider: (state, action) => {
    //   //   state.allProvider = payload;
    //   state.allProvider = action.payload.meta.total >
    //     state.allProvider.length && [
    //     ...action.payload.data,
    //     ...state.allProvider,
    //   ];
    // },
  },

  extraReducers(builder) {
    builder
      .addCase(getAllProviderOneTime.pending, state => {
        state.loadingOneTime = true;
        state.errorOneTime = null;
      })
      .addCase(getAllProviderOneTime.fulfilled, (state, {payload}) => {
        state.allProvider = payload.data;
        state.messageOneTime = payload;
        state.errorOneTime = payload;
        state.loadingOneTime = false;
      })
      .addCase(getAllProviderOneTime.rejected, (state, {payload}) => {
        state.loadingOneTime = false;
        state.errorOneTime = payload;
      });
    builder
      .addCase(getAllProvider.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProvider.fulfilled, (state, {payload}) => {
        state.allProvider = payload?.data && [...state.allProvider, ...payload.data];
        state.message = payload;
        state.error = payload;
        state.loading = false;
      })
      .addCase(getAllProvider.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
// export const {setAllProvider} = allProviderSlice.actions;
export default allProviderSlice.reducer;
