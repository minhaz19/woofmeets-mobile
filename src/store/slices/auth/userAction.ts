import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../api/client';
import authStorage from '../../../utils/helpers/auth/storage';
import { baseUrlV } from '../../../utils/helpers/httpRequest';
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}: any, {rejectWithValue}) => {
    try {
      const response: ApiResponse<any> = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (!response.ok) {
        if (response.data.message) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          Alert.alert('Response Timeout! Please try again');
        } else {
          Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data.message);
      }
      if (response.ok) {
        authStorage.storeToken(response.data.data.access_token);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (
    {firstName, lastName, zipcode, email, password}: any,
    {rejectWithValue},
  ) => {
    try {
      const response: ApiResponse<any> = await apiClient.post(`${baseUrlV}/v2/auth/signup`, {
        firstName,
        lastName,
        zipcode,
        email,
        password,
      });
      if (!response.ok) {
        if (response.data.message) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          Alert.alert('Response Timeout! Please try again');
        } else {
          Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data.message);
      }
      if (response.ok) {
        authStorage.storeToken(response.data.data.access_token);
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const providerAuth = createAsyncThunk(
  'auth/Oauth/signup',
  async (userInfo: any, {rejectWithValue}) => {
    try {
      const response: ApiResponse<any> = await apiClient.post(
        '/auth/Oauth/signup',
        userInfo,
      );
      if (!response.ok) {
        if (response.data.message) {
          Alert.alert(response.data.message);
        } else if (response.problem === 'TIMEOUT_ERROR') {
          Alert.alert('Response Timeout! Please try again');
        } else {
          Alert.alert('An unexpected error happened');
        }
        throw new Error(response.data.message);
      }
      if (response.ok) {
        authStorage.storeToken(response.data.data.access_token);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
