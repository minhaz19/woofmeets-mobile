import {API_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../../../api/client';
export const getProviderInprogressApnt = createAsyncThunk(
  '/v2/appointment/provider/upcoming-inbox/',
  async (url: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `${API_URL}/v2/appointment/provider/upcoming-inbox?${url}`,
      );
      if (!response.ok) {
        if (response.data) {
        } else if (response.problem === 'TIMEOUT_ERROR') {
          return response.data;
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
