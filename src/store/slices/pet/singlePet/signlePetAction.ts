import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
export const getSinglePet = createAsyncThunk(
  '/pet/getSingle',
  async (id: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(`/pet/get/${id}`);
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
