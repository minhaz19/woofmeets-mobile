import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../../api/client';
export const getWhoAmI = createAsyncThunk('/auth/whoami', async () => {
  try {
    const response: ApiResponse<any> = await apiClient.get('/auth/whoami');
    if (!response.ok) {
      if (response.data) {
        // Alert.alert(response.data?.message);
      } else if (response.problem === 'TIMEOUT_ERROR') {
        return response;
      } else {
        // Alert.alert('An unexpected error happened');
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
});
