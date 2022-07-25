import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import Notifications from '../screens/notification/Notifications';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import Colors from '../constants/Colors';
import HomeProfile from '../screens/becomeSitter/HomeProfile';
import BasicInfoSitter from '../screens/becomeSitter/BasicInfo';
import PhoneNumberSitter from '../screens/becomeSitter/PhoneNumber';
import SitterInitialScreen from '../screens/becomeSitter/InitialScreen';
const Stack = createStackNavigator();

const MainNavigator = (props: {previousLoggedIn: Boolean}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          // !props.previousLoggedIn ? 'BottomTabNavigator' : 'HomeProfile'
          !props.previousLoggedIn ? 'BottomTabNavigator' : 'AuthNavigator'
        }>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Notifications" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="HomeProfile"
          component={HomeProfile}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Profile" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SitterInitialScreen"
          component={SitterInitialScreen}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Dog Sitting Jobs"
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="BasicInfoSitter"
          component={BasicInfoSitter}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Profile" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="PhoneNumberSitter"
          component={PhoneNumberSitter}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Profile" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
