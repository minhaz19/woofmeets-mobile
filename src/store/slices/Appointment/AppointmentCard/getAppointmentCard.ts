import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
export const getAppointmentCard = createAsyncThunk(
  '/appointment/card/all-dates//',
  async (opk: string) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        `/appointment/card/all-dates/${opk}`,
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
