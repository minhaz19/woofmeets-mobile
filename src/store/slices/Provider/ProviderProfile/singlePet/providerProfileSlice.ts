import {createSlice} from '@reduxjs/toolkit';
import {getProviderProfile} from './providerProfileAction';

const initialState: any = {
  profileInfo: null,
  providerProfile: null,
  featured: null,
  gallery: null,
  reviews: null,
  overview: null,
  services: null,
  recomendedSitters: null,
  atHome: null,
  canHost: null,
  location: null,
  loading: false,
  error: null,
};

const providerProfileSlice = createSlice({
  name: 'providerProfile',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderProfile.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.providerProfile = payload.data;
        state.profileInfo = payload.data.provider;
        state.gallery = payload.data.galleryPhotos;
        state.featured = payload.data.overview.featured;
        state.overview = payload.data.overview;
        state.services = payload.data.services;
        state.reviews = payload.data.reviews;
        state.location = {
          latitude: payload.data.provider.latitude,
          longitude: payload.data.provider.longitude,
        };
        state.atHome = payload.data.atHome;
        state.canHost = payload.data.canHost;
        state.recomendedSitters = payload.data.recomendedSitters;
      })
      .addCase(getProviderProfile.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerProfileSlice.reducer;
