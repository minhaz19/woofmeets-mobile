import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../api/client';

export const getServiceTypes = createAsyncThunk(
  'services/getServiceTypes',
  async () => {
    const response: ApiResponse<any> = await apiClient.get('/service-types');
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

export const getUserServices = createAsyncThunk(
  'services/getUserServices',
  async () => {
    const response: ApiResponse<any> = await apiClient.get(
      '/provider-services',
    );
    console.log('pro-ser', response);
    if (!response.ok) {
      Alert.alert(response.data.message);
      throw new Error(response.data.message);
    }
    if (response.ok) {
      return response.data;
    }
  },
);

const initialState: any = {
  serviceTypes: null,
  providerServiceId: null,
  error: null,
  loading: false,
  success: false,
  userServices: null,
  userServicesLoading: false,
  userServicesError: null,
};

const services = createSlice({
  name: 'services',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getServiceTypes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceTypes.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.serviceTypes = payload.data;
        state.error = null;
      })
      .addCase(getServiceTypes.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserServices.pending, (state, {payload}) => {
        state.userServicesLoading = true;
        state.userServicesError = null;
      })
      .addCase(getUserServices.fulfilled, (state, {payload}) => {
        state.userServicesLoading = false;
        state.userServices = payload.data;
        state.userServicesError = payload.message;
      })
      .addCase(getUserServices.rejected, (state, {payload}) => {
        state.userServicesLoading = false;
        state.userServicesError = payload;
      });
  },
});

export const {} = services.actions;

export default services.reducer;
