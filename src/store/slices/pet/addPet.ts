import {createSlice} from '@reduxjs/toolkit';
import {addPetValue} from '../../../utils/config/initalValues/initalValues';

export const addPetSlice = createSlice({
  name: 'addPet',
  initialState: addPetValue,
  reducers: {
    setPetValue: (state, action) => {
      return {...state, ...action?.payload};
    },
  },
});
export const {setPetValue} = addPetSlice.actions;

export default addPetSlice.reducer;
