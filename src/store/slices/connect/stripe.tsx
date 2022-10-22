import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import apiClient from '../../../api/client';

export const postUserOnboarding = createAsyncThunk(
    'stripe/postUserOnboarding',
    async () => {
      try {
        const response: ApiResponse<any> = await apiClient.post('/stripe-connect/user-onboarding');
        if (!response.ok) {
          throw new Error(response.data.message);
        }
        return response.data;
      } catch (error: any) {
        
      }
    },
  );

  export const getUserOnboardStatus = createAsyncThunk(
    'stripe/getUserOnboardStatus',
    async () => {
        const response: ApiResponse<any> = await apiClient.get('/stripe-connect/user-onboard-status');
        console.log(response);
        if (!response.ok) {
          throw new Error(response.data.message);
        }
        return response.data;
    },
  );

const initialState: any = {
  userOnboardPost: null,
  userOnboardStatus: null,
  error: null,
  loading: false,
  success: false,
};

const stripe = createSlice({
  name: 'stripe',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(postUserOnboarding.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserOnboarding.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userOnboardPost = payload;
        state.error = null;
      })
      .addCase(postUserOnboarding.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserOnboardStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOnboardStatus.fulfilled, (state, {payload}) => {
        console.log(payload)
        state.loading = false;
        state.userOnboardStatus = payload.data;
        state.error = null;
      })
      .addCase(getUserOnboardStatus.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {} = stripe.actions;

export default stripe.reducer;
