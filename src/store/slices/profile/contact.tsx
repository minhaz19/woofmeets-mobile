import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import apiClient from '../../../api/client';

export const postContactInfo = createAsyncThunk(
    'contact/postContactInfo',
    async ({emergencyContactName, email, emergencyPhone}: any, {rejectWithValue}) => {
      try {
        const response: ApiResponse<any> = await apiClient.post('/user-profile/add-emergency-contact-info', {
          name: emergencyContactName,
          email,
          phone: emergencyPhone,
        });
        if (!response.ok) {
          throw new Error(response.data.message);
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

  export const getContactInfo = createAsyncThunk(
    'contact/getContactInfo',
    async () => {
        const response: ApiResponse<any> = await apiClient.get('/user-profile/contact');
        if (!response.ok) {
          throw new Error(response.data.message);
        }
        return response.data;
    },
  );

const initialState: any = {
  contactInfo: null,
  phoneNumber: null,
  error: null,
  loading: false,
  getLoading: false,
  success: false,
};

const contact = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(postContactInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postContactInfo.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.contactInfo = payload;
        state.error = null;
      })
      .addCase(postContactInfo.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getContactInfo.pending, state => {
        state.getLoading = true;
        state.error = null;
      })
      .addCase(getContactInfo.fulfilled, (state, {payload}) => {
        state.getLoading = false;
        state.contactInfo = payload.data.emergencyContact;
        state.phoneNumber = payload.data.contact?.phone;
        state.error = null;
      })
      .addCase(getContactInfo.rejected, (state, {payload}) => {
        state.getLoading = false;
        state.error = payload;
      });
  },
});

export const {} = contact.actions;

export default contact.reducer;
