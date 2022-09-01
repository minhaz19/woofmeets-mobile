import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import apiClient from '../../../api/client';

export const getServiceTypes = createAsyncThunk(
  'services/getServiceTypes',
    async () => {
        const response: ApiResponse<any> = await apiClient.get('/service-types');
        console.log(response);
        if (!response.ok) {
            throw new Error(response.data.message);
        }
        console.log(response.data);
        return response.data;
    },
);

const initialState: any = {
  serviceTypes: null,
  error: null,
  loading: false,
  success: false,
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
  },
});

export const {} = services.actions;

export default services.reducer;
