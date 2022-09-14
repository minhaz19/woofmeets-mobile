import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import React from 'react';
import apiClient from '../../../api/client';
import CreateProfileLanding from '../../../screens/becomeSitter/CreateProfileLanding';
import Details from '../../../screens/becomeSitter/Details';
import Gallery from '../../../screens/becomeSitter/Gallery/Gallery';
import HomeProfile from '../../../screens/becomeSitter/HomeProfile';
import OnboardingMyPetScreen from '../../../screens/becomeSitter/MyPet';
import SafetyQuiz from '../../../screens/becomeSitter/SafetyQuiz';
import ServiceSelection from '../../../screens/becomeSitter/ServiceSelection';
import SubscriptionScreen from '../../../screens/becomeSitter/Subscription';
import MyPet from '../../../screens/pet/MyPet';
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
        if (action.payload.pass === newArray.length-1) {
          newArray[action.payload.pass].isCompleted = true;
          newArray[action.payload.pass].inProgress = false;
        } else {
          newArray[action.payload.pass].isCompleted = true;
          newArray[action.payload.pass].inProgress = false;
          newArray[action.payload.pass+1].inProgress = true;
        }
        
        state.sitterData = newArray;
        // switch (action.payload.pass) {
        //     case 0:
        //         const newArray = [...state.sitterData];
        //         newArray[action.payload.pass].isCompleted = true;
        //         newArray[action.payload.pass].inProgress = false;
        //         newArray[action.payload.pass+1].inProgress = true;
        //         return {
        //             ...state,
        //             sitterData: newArray
        //         }
        // }
        // state.sitterData = action.payload.sitterData;
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
        if (action.payload.pass === newArray1.length-1) {
          newArray1[action.payload.pass].isCompleted = true;
          newArray1[action.payload.pass].inProgress = false;
        } else {
          newArray1[action.payload.pass].isCompleted = true;
          newArray1[action.payload.pass].inProgress = false;
          newArray1[action.payload.pass+1].inProgress = true;
        }
        state.profileData = newArray1;
    }
  },
});

export const {setSitterData, setProfileData} = contact.actions;

export default contact.reducer;
