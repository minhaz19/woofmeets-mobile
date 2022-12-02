import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  // isSelectedPet: null,
  isPeeSelected: null,
  isPooSelected: null,
  isWaterSelected: null,
  isFoodSelected: null,
  photo: [],
  isPee: 0,
  isPoo: 0,
  isFood: 0,
  isWater: 0,
};

const reportCardSlice = createSlice({
  name: 'reportCard',
  initialState,
  reducers: {
    // setIsSelectedPet: (state, action) => {
    //   state.isSelectedPet = action.payload;
    // },
    setIsPeeSelected: (state, action) => {
      state.isPeeSelected = action.payload;
    },
    setIsPooSelected: (state, action) => {
      state.isPooSelected = action.payload;
    },
    setIsWaterSelected: (state, action) => {
      state.isWaterSelected = action.payload;
    },
    setIsFoodSelected: (state, action) => {
      state.isFoodSelected = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setIsPee: (state, action) => {
      state.isPee = action.payload;
    },
    setIsPoo: (state, action) => {
      state.isPoo = action.payload;
    },
    setIsFood: (state, action) => {
      state.isFood = action.payload;
    },
    setIsWater: (state, action) => {
      state.isWater = action.payload;
    },
  },
});

export const {
  // setIsSelectedPet,
  setIsPeeSelected,
  setIsFoodSelected,
  setIsPooSelected,
  setIsWaterSelected,
  setPhoto,
  setIsPee,
  setIsPoo,
  setIsFood,
  setIsWater,
} = reportCardSlice.actions;

export default reportCardSlice.reducer;
