import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  isSelectedSection: 'serviceSetup',
};

const serviceSetupFlowSlice = createSlice({
  name: 'serviceSetupFlow',
  initialState,
  reducers: {
    setIsSelectedSection: (state, {payload}) => {
        state.isSelectedSection = payload;
      },
  },
});

export const {setIsSelectedSection} = serviceSetupFlowSlice.actions;

export default serviceSetupFlowSlice.reducer;
