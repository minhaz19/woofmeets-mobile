import {createSlice} from '@reduxjs/toolkit';
// import {useSelector} from 'react-redux';
// interface Props {
//   isOpen: boolean;
// }
export const openFilter = createSlice({
  name: 'filter',
  initialState: {isOpen: false},
  reducers: {
    setOpenFilter: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
export const {setOpenFilter} = openFilter.actions;

export default openFilter.reducer;
