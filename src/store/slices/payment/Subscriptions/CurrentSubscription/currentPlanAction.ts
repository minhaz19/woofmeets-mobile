import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../../api/client';
export const getCurrentplan = createAsyncThunk(
  '/subscriptions/my-current-subscription',
  async () => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        'https://woof-api.hirebeet.com/v2/subscriptions/my-current-subscription',
      );
      if (!response.ok) {
        if (response.data) {
          // Alert.alert(response.data?.message);
          throw new Error('no plans');
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
