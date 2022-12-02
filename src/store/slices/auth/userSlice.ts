import {createSlice} from '@reduxjs/toolkit';
import storage from '../../../utils/helpers/auth/storage';
import {appleAuthLogin, providerAuth, registerUser, userLogin} from './userAction';

const initialState: any = {
  isLoggedIn: false,
  userInfo: null,
  userToken: null,
  error: null,
  loading: false,
  providerLoading: false,
  success: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authProviderLoading: (state, payload) => {
      state.providerLoading = payload;
    },
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
      state.isLoggedIn = false;
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
        state.isLoggedIn = true; // login successful
        state.userInfo = payload;
        state.userToken = payload.data.access_token;
        state.success = true; // login successful
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
        state.isLoggedIn = true; // registration successful
        state.userInfo = payload;
        state.userToken = payload.data.access_token;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(providerAuth.pending, state => {
        state.providerLoading = true;
        state.error = null;
      })
      .addCase(providerAuth.fulfilled, (state, {payload}) => {
        state.providerLoading = false;
        state.isLoggedIn = true; // provider authentication successful
        state.userInfo = payload;
        state.success = true;
        state.userToken = payload.data.access_token;
      })
      .addCase(providerAuth.rejected, (state, {payload}) => {
        state.providerLoading = false;
        state.error = payload;
      })
      .addCase(appleAuthLogin.pending, state => {
        state.providerLoading = true;
        state.error = null;
      })
      .addCase(appleAuthLogin.fulfilled, (state, {payload}) => {
        state.providerLoading = false;
        state.isLoggedIn = true; // provider authentication successful
        state.userInfo = payload;
        state.success = true;
        state.userToken = payload.data.access_token;
      })
      .addCase(appleAuthLogin.rejected, (state, {payload}) => {
        state.providerLoading = false;
        state.error = payload;
      });
  },
});

export const {signIn, authProviderLoading, logout} = userSlice.actions;

export default userSlice.reducer;
