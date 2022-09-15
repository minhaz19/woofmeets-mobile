import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import React from 'react';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import CreateProfileLanding from '../../../screens/becomeSitter/CreateProfileLanding';
import Details from '../../../screens/becomeSitter/Details';
import Gallery from '../../../screens/becomeSitter/Gallery/Gallery';
import HomeProfile from '../../../screens/becomeSitter/HomeProfile';
import OnboardingMyPetScreen from '../../../screens/becomeSitter/MyPet';
import SafetyQuiz from '../../../screens/becomeSitter/SafetyQuiz';
import ServiceSelection from '../../../screens/becomeSitter/ServiceSelection';
import Availability from '../../../screens/becomeSitter/ServiceSetUp/Availability/Availability';
import CancellationPolicy from '../../../screens/becomeSitter/ServiceSetUp/CancellationPolicy/CancellationPolicy';
import PetPreference from '../../../screens/becomeSitter/ServiceSetUp/PetPreference/PetPreference';
import Rates from '../../../screens/becomeSitter/ServiceSetUp/Rates';
import YourHome from '../../../screens/becomeSitter/ServiceSetUp/YourHome/YourHome';
import SubscriptionScreen from '../../../screens/becomeSitter/Subscription';
import BasicInfo from '../../../screens/profile/BasicInfo';
import ContactScreen from '../../../screens/profile/ContactScreen';

const initialState: any = {
  sitterData: [
    {
      id: 1,
      sequence: 0,
      title: 'Select Service',
      isCompleted: false,
      inProgress: true,
      screen: <ServiceSelection />,
    },
    {
      id: 2,
      sequence: 1,
      title: 'Set Up Services',
      isCompleted: false,
      inProgress: false,
      screen: <HomeProfile />,
    },
    {
      id: 3,
      sequence: 2,
      title: 'Create Your Profile',
      isCompleted: false,
      inProgress: false,
      screen: <CreateProfileLanding />,
    },
    {
      id: 4,
      sequence: 3,
      title: 'Safety Quiz',
      isCompleted: false,
      inProgress: false,
      screen: <SafetyQuiz />,
    },
    {
      id: 5,
      sequence: 4,
      title: 'Choose a Subscription',
      isCompleted: false,
      inProgress: false,
      screen: <SubscriptionScreen />,
    },
  ],
  profileData: [
    {
      id: 1,
      name: 'basicInfo',
      title: 'Basic Info',
      isCompleted: false,
      inProgress: true,
      screen: <BasicInfo />,
    },
    {
      id: 2,
      name: 'contact',
      title: 'Phone Numbers',
      isCompleted: false,
      inProgress: false,
      screen: <ContactScreen />,
    },
    {
      id: 3,
      name: 'provider',
      title: 'Details',
      isCompleted: false,
      inProgress: false,
      screen: <Details />,
    },
    {
      id: 4,
      name: 'Gallery',
      title: 'Photos',
      isCompleted: false,
      inProgress: false,
      screen: <Gallery />,
    },
    {
      id: 5,
      name: 'pet',
      title: 'Your Pets',
      isCompleted: false,
      inProgress: false,
      screen: <OnboardingMyPetScreen />,
    },
  ],
  boardingSelection: [
    {
      title: 'Rates',
      checked: true,
      isCompleted: false,
      inProgress: true,
      icon: <ArrowRight />,
      screen: Rates,
      // screen: () => {
      //   props.navigation.navigate('Rates');
      // },
    },
    {
      title: 'Availability',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: Availability,
      // screen: () => {
      //   props.navigation.navigate('Availability', {availabilityLoader});
      // },
    },
    {
      title: 'Pet Preference',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: PetPreference,
      // screen: () => {
      //   props.navigation.navigate('PetPreference', {petPreferenceLoader});
      // },
    },
    {
      title: 'Your Home',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: YourHome,
      // screen: () => {
      //   props.navigation.navigate('YourHome', {
      //     itemId: itemId,
      //     name: name,
      //     image: image,
      //     description: description,
      //   });
      // },
    },
    {
      title: 'Cancellation Policy',
      checked: false,
      isCompleted: false,
      inProgress: false,
      icon: <ArrowRight />,
      screen: CancellationPolicy,
      // screen: () => {
      //   props.navigation.navigate('CancellationPolicy', {
      //     itemId: itemId,
      //     name: name,
      //     image: image,
      //     description: description,
      //   });
      // },
    },
  ],
  error: null,
  loading: false,
  success: false,
  oldUser: false,
};

const contact = createSlice({
  name: 'initial',
  initialState,
  reducers: {
    setSitterData: (state, action) => {
      const newArray = [...state.sitterData];
      let val = newArray.length;
      while (val <= 0) {
        newArray[val].isCompleted = false;
        newArray[val].inProgress = false;
        val--;
      }
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
    setProfileData: (state, action) => {
      const newArray1 = [...state.profileData];
      let val = newArray1.length;
      while (val <= 0) {
        newArray1[val].isCompleted = false;
        newArray1[val].inProgress = false;
        val--;
      }
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
    setBoardingSelection: (state, action) => {
      const newArray = [...state.boardingSelection];
      let val = newArray.length;
      while (val <= 0) {
        newArray[val].isCompleted = false;
        newArray[val].inProgress = false;
        val--;
      }
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
  },
});

export const {setSitterData, setProfileData, setBoardingSelection} =
  contact.actions;

export default contact.reducer;
