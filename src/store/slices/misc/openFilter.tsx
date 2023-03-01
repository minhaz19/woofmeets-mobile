import {createSlice} from '@reduxjs/toolkit';
// import {useSelector} from 'react-redux';
// interface Props {
//   isOpen: boolean;
// }
export const openFilter = createSlice({
  name: 'filter',
  initialState: {isOpen: false, isSettingVisible: false, dayError: false},
  reducers: {
    setOpenFilter: (state, action) => {
      state.isOpen = action.payload;
    },
    setOpenSettings: (state, action) => {
      state.isSettingVisible = action.payload;
    },
  },
});
export const {setOpenFilter, setOpenSettings} = openFilter.actions;

export default openFilter.reducer;
