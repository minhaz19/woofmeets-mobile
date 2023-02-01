import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import methods from '../../../../../api/methods';
import {baseUrlV} from '../../../../../utils/helpers/httpRequest';

export const getCurrentplan = createAsyncThunk(
  '/subscriptions/my-current-subscription',
  async (source?: any) => {
    try {
      const response: ApiResponse<any> = await methods._get(
        `${baseUrlV}/v1/subscriptions/my-current-subscription`,
        {},
        source
          ? {
              cancelToken: source.token,
            }
          : {},
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
