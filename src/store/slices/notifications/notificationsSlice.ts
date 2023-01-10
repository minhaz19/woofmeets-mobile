import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import apiClient from '../../../api/client';

const initialState: any = {
  notificationsData: [],
  totalNotifications: null,
  error: null,
  loading: false,
  footerLoading: false,
};

export const getNotifications = createAsyncThunk('/notification', async (data: object) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(`/notification?page=${data.page}&limit=${data.limit}`);
      if (!response.ok) {
        if (response.data) {
          // Alert.alert(response.data?.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          return response;
        } else {
          // Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data?.message);
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  });

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    emptyNotificationsData: (state) => {
        state.notificationsData = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getNotifications.pending, state => {
        state.loading = true;
        state.footerLoading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.notificationsData = [...state.notificationsData, ...payload?.data];
        state.totalNotifications = payload?.meta;
        state.footerLoading = true;
      })
      .addCase(getNotifications.rejected, (state, {payload}) => {
        state.error = payload;
        state.footerLoading = true;
        state.loading = false;
      });
  },
});
export const {emptyNotificationsData} = notificationSlice.actions
export default notificationSlice.reducer;
