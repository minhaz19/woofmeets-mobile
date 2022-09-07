import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../api/client';
export const getUserProfileInfo = createAsyncThunk(
  '/user-profile',
  async () => {
    try {
      const response: ApiResponse<any> = await apiClient.get('/user-profile');
      if (!response.ok) {
        if (response.data) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          Alert.alert('Response Timeout! Please try again');
          const res: ApiResponse<any> = await apiClient.get('/user-profile');
          return res.data;
        } else {
          Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data.message);
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
