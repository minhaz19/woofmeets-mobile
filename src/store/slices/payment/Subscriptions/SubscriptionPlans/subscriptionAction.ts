import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import methods from '../../../../../api/methods';
export const getSubscription = createAsyncThunk(
  '/subscriptions/membership-plans',
  async () => {
    try {
      const response: ApiResponse<any> = await methods._get(
        '/subscriptions/membership-plans',
      );
      if (!response.ok) {
        if (response.data) {
          Alert.alert(response.data?.message);
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
