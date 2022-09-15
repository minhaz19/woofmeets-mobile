import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  ServiceSetup: null,
};

const serviceSetupSlice = createSlice({
  name: 'serviceSetup',
  initialState,
  reducers: {
    setServiceSetup: (state, {payload}) => {
      state.serviceSetup = payload;
    },
  },
});

export const {setServiceSetup} = serviceSetupSlice.actions;
export default serviceSetupSlice.reducer;
