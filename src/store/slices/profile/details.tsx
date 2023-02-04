import {API_URL} from '@env';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import apiClient from '../../../api/client';
import methods from '../../../api/methods';

export const postSitterDetails = createAsyncThunk(
  'details/postSitterDetails',
  async ({
    headline,
    yearsOfExperience,
    experienceDescription,
    mtd,
    skills,
    petPerDay,
    smallDog,
    mediumDog,
    largeDog,
    giantDog,
    cat,
    homeAttributes,
    homeType,
    yardType,
  }: any) => {
    const body = {
      headline: headline,
      yearsOfExperience: yearsOfExperience,
      dogsExperience: '',
      walkingExperience: '',
      requestedDogInfo: '',
      experienceDescription: experienceDescription,
      skills: skills,
      petPerDay: petPerDay,
      smallDog: smallDog,
      mediumDog: mediumDog,
      largeDog: largeDog,
      giantDog: giantDog,
      cat: cat,
      homeType: homeType,
      yardType: yardType,
      homeAttributes: homeAttributes,
    };
    try {
      if (mtd === 'put') {
        const response: ApiResponse<any> = await apiClient.put(
          `${API_URL}/v2/user-profile/onboarding/sitter-preference`,
          body,
        );
        if (!response.ok) {
          throw new Error(response.data.message);
        }
        if (response.ok) {
          return response.data;
        }
      } else {
        const response: ApiResponse<any> = await apiClient.post(
          `${API_URL}/v2/user-profile/onboarding/sitter-preference`,
          body,
        );
        if (!response.ok) {
          throw new Error(response.data.message);
        }
        if (response.ok) {
          return response.data;
        }
      }
    } catch (error: any) {}
  },
);

export const getSkillsData = createAsyncThunk(
  'details/getSkillsData',
  async () => {
    const response: ApiResponse<any> = await methods._get(
      '/user-profile/profile-skill-types',
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

export const getSitterDetails = createAsyncThunk(
  'details/getSitterDetails',
  async () => {
    const response: ApiResponse<any> = await apiClient.get(
      '/user-profile/provider-details',
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

export const getUserDetailsPreference = createAsyncThunk(
  'details/getUserDetailsPreference',
  async () => {
    const response: ApiResponse<any> = await apiClient.get(
      `${API_URL}/v2/user-profile/onboarding/sitter-preference`,
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

export const getAttributesPreference = createAsyncThunk(
  'details/getAttributesPreference',
  async () => {
    const response: ApiResponse<any> = await apiClient.get(
      '/provider-home/attributue-title-types',
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
);

const initialState: any = {
  sitterInfo: null,
  sitterInfoPost: null,
  attributes: null,
  skillsData: null,
  skills: null,
  petPreference: null,
  petPerDay: 1,
  yourHome: null,
  error: null,
  loading: false,
  loadingSitter: false,
  success: false,
  attributesLoading: false,
  skillsLoading: false,
};

const details = createSlice({
  name: 'details',
  initialState,
  reducers: {
    increment: state => {
      state.petPerDay += 1;
    },
    decrement: state => {
      if (state.petPerDay > 1) {
        state.petPerDay -= 1;
      }
    },
    setPetPreference: (state, {payload}) => {
      state.petPreference = payload;
    },
    setYourHome: (state, {payload}) => {
      state.yourHome = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(postSitterDetails.pending, state => {
        state.loadingSitter = true;
        state.error = null;
      })
      .addCase(postSitterDetails.fulfilled, (state, {payload}) => {
        state.loadingSitter = false;
        state.sitterInfoPost = payload;
        state.error = null;
      })
      .addCase(postSitterDetails.rejected, (state, {payload}) => {
        state.loadingSitter = false;
        state.error = payload;
      })
      .addCase(getUserDetailsPreference.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetailsPreference.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.sitterInfo = payload?.data?.providerDetails;
        state.skills = payload?.data?.providerSkills;
        state.petPreference = payload?.data?.petPreference;
        state.petPerDay = payload?.data?.petPreference?.petPerDay
          ? payload?.data?.petPreference.petPerDay
          : 1;
        state.yourHome = payload?.data?.providerHome;
        state.error = null;
      })
      .addCase(getUserDetailsPreference.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSkillsData.pending, state => {
        state.skillsLoading = true;
        state.error = null;
      })
      .addCase(getSkillsData.fulfilled, (state, {payload}) => {
        state.skillsLoading = false;
        state.skillsData = payload.data;
        state.error = null;
      })
      .addCase(getSkillsData.rejected, (state, {payload}) => {
        state.skillsLoading = false;
        state.error = payload;
      })
      .addCase(getAttributesPreference.pending, state => {
        state.attributesLoading = true;
        state.error = null;
      })
      .addCase(getAttributesPreference.fulfilled, (state, {payload}) => {
        state.attributesLoading = false;
        state.attributes = payload.data;
        state.error = null;
      })
      .addCase(getAttributesPreference.rejected, (state, {payload}) => {
        state.attributesLoading = false;
        state.error = payload;
      });
  },
});

export const {increment, decrement, setPetPreference, setYourHome} =
  details.actions;

export default details.reducer;
