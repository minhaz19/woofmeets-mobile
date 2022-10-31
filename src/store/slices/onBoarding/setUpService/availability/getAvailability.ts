import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../../../api/client';
export const getAvailability = createAsyncThunk(
  '/availability',
  async (id: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `/availability/service/${id}`,
      );
      console.log('res av', response);
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
