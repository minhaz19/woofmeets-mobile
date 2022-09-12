import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  baseRate: null,
};

const serviceRateFieldSlice = createSlice({
  name: 'baseRate',
  initialState,
  reducers: {
    setBaseRate: (state, {payload}) => {
      state.baseRate = payload;
    },
  },
});
export const {setBaseRate} = serviceRateFieldSlice.actions;
export default serviceRateFieldSlice.reducer;
