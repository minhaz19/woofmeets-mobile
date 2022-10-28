import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  isSelectedPet: null,
};

const reportCardSlice = createSlice({
  name: 'reportCard',
  initialState,
  reducers: {
    setIsSelectedPet: (state, action) => {
      state.isSelectedPet = action.payload;
    },
  },
});

export const {setIsSelectedPet} = reportCardSlice.actions;

export default reportCardSlice.reducer;
