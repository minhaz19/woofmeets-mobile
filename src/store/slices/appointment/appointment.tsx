import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';

export const upcomingInboxFetch = createAsyncThunk(
  'appointment/upcomingInboxFetch',
  async ({statusId}: any) => {
    const response: ApiResponse<any> = await apiClient.get(
      `/appointment/inbox?status=${statusId}`,
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    upcomingAppointment: null,
    upcomingStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(upcomingInboxFetch.pending, (state, action) => {
        state.upcomingStatus = 'loading';
      })
      .addCase(upcomingInboxFetch.fulfilled, (state, action) => {
        state.upcomingStatus = 'succeeded';
        state.upcomingAppointment = action.payload.data;
      })
      .addCase(upcomingInboxFetch.rejected, (state, action) => {
        state.upcomingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});
export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
