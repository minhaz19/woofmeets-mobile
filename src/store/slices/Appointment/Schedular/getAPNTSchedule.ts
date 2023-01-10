import {API_URL} from '@env';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
interface PropType {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  payload: any;
}
export const getOnGoingAPNT = createAsyncThunk(
  '/v1/appointment/provider/scheduler/on-going',

  async ({page, limit, sortBy, sortOrder, payload}: PropType) => {
    try {
      const response: ApiResponse<any> = await apiClient.post(
        `${API_URL}/v1/appointment/provider/scheduler/on-going?page=${page}&limit=${limit}0&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        payload,
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
export const getUpCommingAPNT = createAsyncThunk(
  '/v1/appointment/provider/scheduler/upcoming',

  async ({page, limit, sortBy, sortOrder, payload}: PropType) => {
    try {
      const response: ApiResponse<any> = await apiClient.post(
        `${API_URL}/v1/appointment/provider/scheduler/upcoming?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        payload,
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
export const getPastAPNT = createAsyncThunk(
  '/v1/appointment/provider/scheduler/past',

  async ({page, limit, sortBy, sortOrder, payload}: PropType) => {
    try {
      const response: ApiResponse<any> = await apiClient.post(
        `${API_URL}/v1/appointment/provider/scheduler/past?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        payload,
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
