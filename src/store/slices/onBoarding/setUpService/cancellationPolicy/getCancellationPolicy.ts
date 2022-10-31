import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import { Alert } from 'react-native';
import apiClient from '../../../../../api/client';
export const getCancellationPolicy = createAsyncThunk(
  '/cancellation-policy',
  async () => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        '/cancellation-policy',
      );
      console.log('can', response);
      if (!response.ok) {
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
  },
);

export const getSingleCancellationPolicy = createAsyncThunk(
  '/cancellation-policy/povider-policy',
  async () => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        '/cancellation-policy/povider-policy',
      );
      if (!response.ok) {
        // Alert.alert(response.data.message)
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
  },
);
