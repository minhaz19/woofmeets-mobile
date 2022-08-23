import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {Alert} from 'react-native';
import apiClient from '../../../api/client';
import authStorage from '../../../utils/helpers/auth/storage';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}: any, {rejectWithValue}) => {
    try {
      const response: ApiResponse<any> = await apiClient.post('/auth/login', {
        email,
        password,
      });
      if (!response.ok) {
        Alert.alert(response.data.message);
        throw new Error(response.data.message);
      } else {
        console.log('login data', response.data.data.access_token);
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
  '/auth/signup',
  async (
    {firstName, lastName, zipcode, email, password}: any,
    {rejectWithValue},
  ) => {
    try {
      const response: ApiResponse<any> = await apiClient.post('auth/signup', {
        firstName,
        lastName,
        zipcode,
        email,
        password,
      });
      if (!response.ok) {
        Alert.alert(response.data.message);
        throw new Error(response.data.message);
      } else {
        authStorage.storeToken(response.data.data.access_token);
        Alert.alert(response.data.message);
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
