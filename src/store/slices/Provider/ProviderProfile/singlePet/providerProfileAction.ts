import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../../api/client';
export const getProviderProfile = createAsyncThunk(
  'provider/details',
  async (id: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `/provider/${id}/details`,
      );
      if (!response.ok) {
        if (response.data) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          return response;
        } else {
          Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data.message);
      }
      console.log('provider profile data', response.data);
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
