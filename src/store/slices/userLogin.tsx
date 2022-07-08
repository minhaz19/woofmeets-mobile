import {createSlice} from '@reduxjs/toolkit';

export const userLogin = createSlice({
  name: 'addPet',
  initialState: {isPreviousUser: false},
  reducers: {
    setUserLoggedIn: state => {
      state.isPreviousUser = true;
    },
  },
});
export const {setUserLoggedIn} = userLogin.actions;

export default userLogin.reducer;
