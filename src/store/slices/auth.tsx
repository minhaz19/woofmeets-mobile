import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import baseUrl from '../../utils/helpers/httpRequest';

// get data from component
// const auth = useSelector((state: RootState) => state.auth);

// let action= {
//     token: jwtToken,
//     userId: userId,
// }
// const callDetails = async () => {
//   if (status !== 'succeeded') {
//     await dispatch(
//       getDetails(action),
//     );
//   }
// };

// useEffect(() => {
//   if (status === 'idle') {
//     dispatch(getDetails());
//   }
// }, [dispatch, status]);


export const getDetails = createAsyncThunk('auth/getDetails', async (token) => {
  // parameter will be in async
  const response = await fetch(`${baseUrl}/user/`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
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
    status: 'idle',
  },

  reducers: {
    // call from component
    // await dispatch(
    //   signIn({
    //     provider: providerType,
    //     jwtToken: newJwt,
    //     payload: {
    //       email: email,
    //       sub: sub,
    //     },
    //   }),
    // );
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
        // fetched data is in payloaad
        state.userInfo = action.payload;
      })
      .addCase(getDetails.rejected, state => {
        state.status = 'failed';
      });
  },
});
export const {signIn, logout} = userSlice.actions;

export default userSlice.reducer;
