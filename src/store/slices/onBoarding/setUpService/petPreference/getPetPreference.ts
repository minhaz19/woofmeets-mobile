import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../../../api/client';
export const getPetPreference = createAsyncThunk(
  '/pet-preference',
  async () => {
    try {
      const response: ApiResponse<any> = await apiClient.get('/pet-preference');
      if (!response.ok) {
        console.log('getPetPreference----', response.data?.message);
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
