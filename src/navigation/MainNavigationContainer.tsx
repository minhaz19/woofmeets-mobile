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
import ProviderNavigator from './ProviderNavigator';
import BoardingSetting from '../screens/boardingSetting/BoardingSetting';
import InviteFriends from '../screens/Misc/InviteFriends';
import PromoGiftCodes from '../screens/Misc/PromoGiftCodes';
import ReceivePayments from '../screens/Misc/ReceivePayments';
import Gallery from '../screens/becomeSitter/Gallery/Gallery';
import ServiceSelection from '../screens/becomeSitter/ServiceSelection';
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
          name="ProviderNavigator"
          component={ProviderNavigator}
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
        <Stack.Screen
          name="GallerySitter"
          component={Gallery}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Profile"
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="BoardingSetting"
          component={BoardingSetting}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Boarding Setting"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="InviteFriends"
          component={InviteFriends}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Invite Friends"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="PromoGiftCodes"
          component={PromoGiftCodes}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Promo & Gift Codes"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ReceivePayments"
          component={ReceivePayments}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Receive Payments"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ServiceSelection"
          component={ServiceSelection}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Service Selection"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
