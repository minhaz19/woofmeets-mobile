import {createSlice} from '@reduxjs/toolkit';
import {getNewOnboarding} from './newOnboardingAction';

const initialState: any = {
  fieldValue: null,
  error: null,
  onboardingLoading: false,
  availability: null,
  cancellationPolicyId: null,
  ServicePetPreference: null,
  homeType: null,
  yardType: null,
  homeAttributes: null,
  basicInfo: null,
  emergencyContact: null,
  providerDetails: null,
  skills: null,
  profileImage: null,
};

const newOnboardingSlice = createSlice({
  name: 'newOnboarding',
  initialState,
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getNewOnboarding.pending, state => {
        state.onboardingLoading = true;
        state.error = null;
      })
      .addCase(getNewOnboarding.fulfilled, (state, {payload}) => {
        state.onboardingLoading = false;
        state.availability = payload?.data?.availability;
        state.cancellationPolicyId =
          payload?.data?.provider?.cancellationPolicyId;
        state.ServicePetPreference = payload?.data?.ServicePetPreference;
        state.homeType = payload?.data?.provider?.homeType;
        state.yardType = payload?.data?.provider?.yardType;
        state.homeAttributes = payload?.data?.HomeAttributes;

        state.basicInfo = payload?.data?.basicInfo;
        state.emergencyContact = payload?.data?.emergencyContact;
        state.providerDetails = payload?.data?.providerDetails;
        state.skills = payload?.data?.skills;
        state.profileImage = payload?.data?.userProfileImage?.url;
        state.fieldValue = payload?.data?.rates?.map(
          (item: {
            id: number;
            amount: number;
            serviceTypeRate: {serviceRateTypeId: number};
          }) => {
            return {
              id: item?.id,
              modRatesId: item?.serviceTypeRate?.serviceRateTypeId,
              amount: item?.amount,
            };
          },
        );
      })
      .addCase(getNewOnboarding.rejected, (state, {payload}) => {
        state.onboardingLoading = false;
        state.error = payload;
      });
  },
});
export const {setProfileImage} = newOnboardingSlice?.actions;
export default newOnboardingSlice.reducer;
