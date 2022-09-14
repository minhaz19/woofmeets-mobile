import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';
import { useAppDispatch } from '../../store';
import { setProfileData } from '../onBoarding/initial';

export const postSitterDetails = createAsyncThunk(
  'details/postSitterDetails',
  async (
    {
      headline,
      yearsOfExperience,
      experienceDescription,
      environmentDescription,
      scheduleDescription,
    }: any,
    {rejectWithValue},
  ) => {
    const body = {
      headline: headline,
      yearsOfExperience: yearsOfExperience,
      experienceDescription: experienceDescription,
      environmentDescription: environmentDescription,
      scheduleDescription: scheduleDescription,
    };
    try {
      const response: ApiResponse<any> = await apiClient.post(
        '/user-profile/provider-details',
        body,
      );
      if (!response.ok) {
        throw new Error(response.data.message);
      }
      if (response.ok) {
        const dispatch = useAppDispatch();
        // dispatch(setProfileData({pass:2}));
        return response.data;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getSitterDetails = createAsyncThunk(
  'details/getSitterDetails',
  async () => {
    const response: ApiResponse<any> = await apiClient.get(
      '/user-profile/provider-details',
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

const initialState: any = {
  sitterInfo: null,
  error: null,
  loading: false,
  success: false,
};

const details = createSlice({
  name: 'details',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(postSitterDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSitterDetails.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.sitterInfo = payload;
        state.error = null;
      })
      .addCase(postSitterDetails.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSitterDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSitterDetails.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.sitterInfo = payload.data;
        state.error = null;
      })
      .addCase(getSitterDetails.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {} = details.actions;

export default details.reducer;
