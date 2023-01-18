import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
export const getCards = createAsyncThunk(
  '/stripe-payment-method/all-cards',
  async (source?: any) => {
    try {
      const response: ApiResponse<any> = await apiClient.get(
        '/stripe-payment-method/all-cards',
        source
          ? {
              cancelToken: source.token,
            }
          : {},
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
