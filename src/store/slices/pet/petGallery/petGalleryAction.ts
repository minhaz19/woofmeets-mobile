import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
export const getPetGallery = createAsyncThunk(
  '/pet/photo/get-all/',
  async (opk: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `/pet/photo/get-all/${opk}`,
      );
      if (!response.ok) {
        if (response.data) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          Alert.alert('Response Timeout! Please try again');
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
