import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import React from 'react';
// import apiClient from '../../../api/client';
import methods from '../../../api/methods';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import CompleteOnboarding from '../../../screens/becomeSitter/CompleteOnboarding';
import CreateProfileLanding from '../../../screens/becomeSitter/CreateProfileLanding';
import Details from '../../../screens/becomeSitter/Details';
// import Gallery from '../../../screens/becomeSitter/Gallery/Gallery';
import HomeProfile from '../../../screens/becomeSitter/HomeProfile';
// import OnboardingMyPetScreen from '../../../screens/becomeSitter/MyPet';
import SafetyQuiz from '../../../screens/becomeSitter/SafetyQuiz';
import ServiceSelection from '../../../screens/becomeSitter/ServiceSelection';
import Availability from '../../../screens/becomeSitter/ServiceSetUp/Availability/Availability';
import CancellationPolicy from '../../../screens/becomeSitter/ServiceSetUp/CancellationPolicy/CancellationPolicy';
// import PetPreference from '../../../screens/becomeSitter/ServiceSetUp/PetPreference/PetPreference';
import Rates from '../../../screens/becomeSitter/ServiceSetUp/Rates';
// import YourHome from '../../../screens/becomeSitter/ServiceSetUp/YourHome/YourHome';
// import PetPreference from '../../../screens/becomeSitter/ServiceSetUp/PetPreference/PetPreference';
// import YourHome from '../../../screens/becomeSitter/ServiceSetUp/YourHome/YourHome';
// import SubscriptionScreen from '../../../screens/becomeSitter/Subscription';
import BasicInfo from '../../../screens/profile/BasicInfo';
import ContactScreen from '../../../screens/profile/ContactScreen/ContactScreen';

export const getOnboardingProgress = createAsyncThunk(
  'progress/getOnboardingProgress',
  async (slug?: string | undefined) => {
    const response: ApiResponse<any> = await methods._get(
      '/user-profile/onboarding-progress',
    );
    if (!response.ok) {
      throw new Error(response.data.message);
    }
    return {data: response.data, slug: slug};
  },
);

const initialState: any = {
  progressData: null,
  sitterData: [
    {
      id: 1,
      sequence: 0,
      title: 'Select Service',
      name: 'serviceSelection',
      isCompleted: false,
      inProgress: true,
      screen: <ServiceSelection />,
    },
    {
      id: 2,
      sequence: 1,
      title: 'Set Up Services',
      name: 'serviceSetup',
      isCompleted: false,
      inProgress: false,
      screen: <HomeProfile />,
    },
    {
      id: 3,
      sequence: 2,
      title: 'Create Your Profile',
      name: 'profileSetup',
      isCompleted: false,
      inProgress: false,
      screen: <CreateProfileLanding />,
    },
    {
      id: 4,
      sequence: 3,
      title: 'Safety Quiz',
      name: 'safetyQuiz',
      isCompleted: false,
      inProgress: false,
      screen: <SafetyQuiz />,
    },
    {
      id: 5,
      sequence: 4,
      title: 'Final Submittion',
      name: 'CompleteOnboarding',
      isCompleted: false,
      inProgress: false,
      screen: <CompleteOnboarding />,
    },
    // {
    //   id: 5,
    //   sequence: 4,
    //   title: 'Choose a Subscription',
    //   name: 'subscription',
    //   isCompleted: false,
    //   inProgress: false,
    //   screen: <SubscriptionScreen route={undefined} navigation={undefined} />,
    // },
  ],
  profileData: [
    {
      id: 1,
      name: 'BASIC_INFO',
      title: 'Basic Info',
      isCompleted: false,
      inProgress: true,
      screen: <BasicInfo />,
    },
    {
      id: 2,
      name: 'CONTACT',
      title: 'Phone Numbers',
      isCompleted: false,
      inProgress: false,
      screen: <ContactScreen />,
    },
    {
      id: 3,
      name: 'DETAILS',
      title: 'Details',
      isCompleted: false,
      inProgress: false,
      screen: <Details />,
    },
    // {
    //   id: 4,
    //   name: 'GALLERY',
    //   title: 'Photos',
    //   isCompleted: false,
    //   inProgress: false,
    //   screen: <Gallery />,
    // },
    // {
    //   id: 5,
    //   name: 'PET_MANAGEMENT',
    //   title: 'Your Pets',
    //   isCompleted: false,
    //   inProgress: false,
    //   screen: <OnboardingMyPetScreen />,
    // },
  ],
  boardingSelection: [
    {
      id: 1,
      title: 'Rates',
      name: 'SERVICE_RATES',
      checked: true,
      isCompleted: false,
      inProgress: true,
      icon: <ArrowRight />,
      screen: Rates,
    },
    {
      id: 2,
      title: 'Availability',
      name: 'AVAILABILITY',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: Availability,
    },
    {
      id: 3,
      title: 'Cancellation Policy',
      name: 'CANCELLATION_POLICY',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: CancellationPolicy,
    },
    // {
    //   id: 5,
    //   title: 'Pet Preference',
    //   name: 'PROVIDER_PET_PREFERANCE',
    //   checked: false,
    //   isCompleted: false,
    //   inProgress: false,
    //   icon: <ArrowRight />,
    //   screen: PetPreference,
    // },
    // {
    //   id: 4,
    //   title: 'Your Home',
    //   name: 'HOME_ATTRIBUTES',
    //   checked: false,
    //   isCompleted: false,
    //   inProgress: false,
    //   icon: <ArrowRight />,
    //   screen: YourHome,
    // },
  ],
  error: null,
  loading: false,
  individualServiceSublist: null,
  selectedService: '',
  success: false,
  oldUser: false,
};

const contact = createSlice({
  name: 'initial',
  initialState,
  reducers: {
    setSitterData: (state, action) => {
      const newArray = [...state.sitterData];
      newArray.map(v => {
        v.inProgress = false;
        return v;
      });
      state.oldUser = true;
      if (action.payload.pass === newArray.length - 1) {
        newArray[action.payload.pass].isCompleted = true;
        newArray[action.payload.pass].inProgress = false;
      } else {
        newArray[action.payload.pass].isCompleted = true;
        newArray[action.payload.pass].inProgress = false;
        newArray[action.payload.pass + 1].inProgress = true;
      }
      state.sitterData = newArray;
    },
    setCurrentScreen: (state, action) => {
      const newArray = [...state.sitterData];
      if (action.payload.pass === 0) {
        //do nothing
      } else if (state.sitterData[0].isCompleted) {
        // if (action.payload.pass === 4) {
        //   if (
        //     state.sitterData[1].isCompleted &&
        //     state.sitterData[2].isCompleted &&
        //     state.sitterData[3].isCompleted
        //   ) {
        //     newArray.map(v => {
        //       v.inProgress = false;
        //       return v;
        //     });
        //     newArray[action.payload.pass].inProgress = true;
        //   }
        // } else {
        newArray.map(v => {
          v.inProgress = false;
          return v;
        });
        newArray[action.payload.pass].inProgress = true;
        // }
      }
      state.sitterData = newArray;
    },
    setProfileData: (state, action) => {
      const newArray1 = [...state.profileData];
      newArray1.map(v => {
        v.inProgress = false;
        return v;
      });
      state.oldUser = true;
      if (action.payload.pass === newArray1.length - 1) {
        newArray1[action.payload.pass].isCompleted = true;
        newArray1[action.payload.pass].inProgress = false;
      } else {
        newArray1[action.payload.pass].isCompleted = true;
        newArray1[action.payload.pass].inProgress = false;
        newArray1[action.payload.pass + 1].inProgress = true;
      }
      state.profileData = newArray1;
    },
    setProfileScreen: (state, action) => {
      const newArray1 = [...state.profileData];
      newArray1.map(v => {
        v.inProgress = false;
        return v;
      });
      state.oldUser = true;
      newArray1[action.payload.pass].inProgress = true;
    },
    setBoardingScreen: (state, action) => {
      const newArray1 = [...state.boardingSelection];
      newArray1.map(v => {
        v.inProgress = false;
        return v;
      });
      state.oldUser = true;
      newArray1[action.payload.pass].inProgress = true;
    },
    setBoardingSelection: (state, action) => {
      const newArray = [...state.boardingSelection];
      newArray.map(v => {
        v.inProgress = false;
        return v;
      });
      state.oldUser = true;
      if (action.payload.pass === newArray.length - 1) {
        newArray[action.payload.pass].isCompleted = true;
        newArray[action.payload.pass].inProgress = false;
      } else {
        newArray[action.payload.pass].isCompleted = true;
        newArray[action.payload.pass].inProgress = false;
        newArray[action.payload.pass + 1].inProgress = true;
      }
      state.boardingSelection = newArray;
    },
    setSelectedSetUpService: (state, {payload}) => {
      const newArray1 = [...state.boardingSelection];
      const newData = newArray1?.map(v => {
        return {
          ...v,
          isCompleted:
            v.name === 'CANCELLATION_POLICY'
              ? v?.isCompleted
              : state.individualServiceSublist?.[payload]?.[v.name]?.complete,
        };
      });
      state.boardingSelection = newData;
      state.selectedService = payload;
    },
    setUpdateBoardingSelection: (state, {payload}) => {
      state.boardingSelection = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOnboardingProgress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnboardingProgress.fulfilled, (state, {payload}) => {
        const data = payload?.data;
        // const slug = payload?.slug;
        state.loading = false;
        state.progressData = data?.data;
        state.individualServiceSublist =
          data?.data.individualServiceSetupSublist;
        const serviceSubList = data?.data.serviceSetupSublist;
        // const individualServiceSetupSublistTemp =
        //   data?.data?.individualServiceSetupSublist[state.selectedService];
        const sitterDataTemp = [...state.sitterData];
        sitterDataTemp.map(v => {
          switch (v.name) {
            case 'serviceSelection':
              return (v.isCompleted = data?.data.serviceSelection);
            case 'serviceSetup':
              return (v.isCompleted = data?.data.serviceSetup);
            case 'profileSetup':
              return (v.isCompleted = data?.data.profileSetup);
            case 'safetyQuiz':
              return (v.isCompleted = data?.data.safetyQuiz);
            case 'subscription':
              return (v.isCompleted = data?.data.subscription);
          }
          return v;
        });
        // create profile screen progress
        const profileDataTemp = [...state.profileData];
        const profileSubList = data?.data.profileSetupSublist;
        profileDataTemp.map(v => {
          switch (v.name) {
            case 'BASIC_INFO':
              return (v.isCompleted = profileSubList.BASIC_INFO.complete);
            case 'DETAILS':
              return (v.isCompleted = profileSubList.DETAILS.complete);
            case 'CONTACT':
              return (v.isCompleted = profileSubList.CONTACT.complete);
            case 'GALLERY':
              return (v.isCompleted = profileSubList.GALLERY.complete);
            case 'PET_MANAGEMENT':
              return (v.isCompleted = profileSubList.PET_MANAGEMENT.complete);
          }
          return v;
        });
        // service setup screen progress
        const serviceSetupTemp = [...state.boardingSelection];
        serviceSetupTemp.map(v => {
          switch (v.name) {
            case 'PROVIDER_PET_PREFERANCE':
              return (v.isCompleted =
                serviceSubList.PROVIDER_PET_PREFERANCE.complete);
            case 'HOME_ATTRIBUTES':
              return (v.isCompleted = serviceSubList.HOME_ATTRIBUTES.complete);
            case 'CANCELLATION_POLICY':
              return (v.isCompleted =
                serviceSubList.CANCELLATION_POLICY.complete);
            case 'SERVICE_RATES':
              return (v.isCompleted = false);
            // individualServiceSetupSublistTemp.SERVICE_RATES.complete);
            case 'AVAILABILITY':
              return (v.isCompleted = false);
            // individualServiceSetupSublistTemp.AVAILABILITY.complete);
          }
          return v;
        });
        // service setup sublist

        state.error = null;
      })
      .addCase(getOnboardingProgress.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setSitterData,
  setProfileData,
  setBoardingSelection,
  setCurrentScreen,
  setProfileScreen,
  setBoardingScreen,
  setUpdateBoardingSelection,
  setSelectedSetUpService,
} = contact.actions;

export default contact.reducer;
