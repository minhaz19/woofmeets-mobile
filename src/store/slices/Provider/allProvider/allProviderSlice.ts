import {createSlice} from '@reduxjs/toolkit';
import {getAllProvider} from './getAllProvider';

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
      .addCase(getAllProvider.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProvider.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.allProvider = [...state.allProvider, ...payload?.data];
        state.message = payload;
      })
      .addCase(getAllProvider.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
// export const {setAllProvider} = allProviderSlice.actions;
export default allProviderSlice.reducer;
