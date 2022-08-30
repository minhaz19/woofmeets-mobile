import {createSlice} from '@reduxjs/toolkit';
import {getUserProfileInfo} from './userProfileAction';

const initialState: any = {
  userInfo: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserProfileInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileInfo.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userInfo = payload.data;
      })
      .addCase(getUserProfileInfo.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
