import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../../api/client';

export const getAllProvider = createAsyncThunk(
  '/provider/getAllProvider',
  async (formattedData: any) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        '/provider',
        formattedData,
      );
      if (!response.ok) {
        throw new Error(response.data?.message);
      }
      return response?.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  },
);

export const getAllProviderOneTime = createAsyncThunk(
  '/provider/getAllProviderOneTime',
  async (formattedData: any) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        '/provider',
        formattedData,
      );
      if (!response.ok) {
        throw new Error(response.data?.message);
      }
      return response?.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  },
);