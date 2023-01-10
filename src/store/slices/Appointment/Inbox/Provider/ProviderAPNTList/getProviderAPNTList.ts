import {API_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../../../api/client';
interface PropType {
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}
export const getProviderAPNTList = createAsyncThunk(
  '/v3/appointment/provider/inbox',

  async ({status, page, limit, sortBy, sortOrder}: PropType) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `${API_URL}/v3/appointment/provider/inbox?status=${status}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      );
      if (!response.ok) {
        if (response.data) {
        } else if (response.problem === 'TIMEOUT_ERROR') {
          return response;
        } else {
          Alert.alert('An unexpected error happened');
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
  },
);
