import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../../../api/client';
export const getYourHome = createAsyncThunk('/provider-home', async () => {
  try {
    const response: ApiResponse<any> = await apiClient.get('/provider-home');
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
});
