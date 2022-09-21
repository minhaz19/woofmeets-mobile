import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  selectedItem: null,
  selectService: {},
  loading: false,
  error: null,
};

const rescheduleSlice = createSlice({
  name: 'reschedule',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setSelectService: (state, action) => {
      state.selectService = action.payload;
    },
  },
});

export const {setSelectedItem, setSelectService} = rescheduleSlice.actions;

export default rescheduleSlice.reducer;
