import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../../../api/client';
export const getRateFieldValue = createAsyncThunk(
  '/service-rates',
  async (id: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `/service-rates/${id}`,
      );
      if (!response.ok) {
        if (response.data) {
          console.log('');
        } else if (response.problem === 'TIMEOUT_ERROR') {
          return response;
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
