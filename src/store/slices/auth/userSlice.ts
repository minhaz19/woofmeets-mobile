import {createSlice} from '@reduxjs/toolkit';
import storage from '../../../utils/helpers/auth/storage';
import {registerUser, userLogin} from './userAction';

const initialState: any = {
  isLoggedIn: false,
  userInfo: null,
  userToken: null,
  error: null,
  loading: false,
  success: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.loading = false;
        state.success = true; // login successful
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.isLoggedIn = true;
    },
    logout: state => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      storage.removeToken();
    },
  },

  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.success = true; // login successful
        state.userInfo = payload.data.info;
        state.userToken = payload.data.access_token;
        state.isLoggedIn = true;
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.success = true; // registration successful
        state.userInfo = payload;
        state.userToken = payload.data.access_token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
