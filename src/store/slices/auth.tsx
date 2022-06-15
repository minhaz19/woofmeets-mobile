import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import baseUrl from '../../helpers/httpRequest';

export const getDetails = createAsyncThunk('auth/getDetails', async () => {
  const response = await fetch(`${baseUrl}/user/`, {
    method: 'GET',
    headers: {
      //   Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  const resData = await response.json();
  return resData;
});

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userResponse: null,
    userInfo: null,
    errorMessage: null,
    cognito: null,
    status: 'idle',
  },
  reducers: {
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.userResponse = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.userResponse = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(getDetails.rejected, state => {
        state.status = 'failed';
      });
  },
});
export const {signIn, logout} = userSlice.actions;

export default userSlice.reducer;
