import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import Notifications from '../screens/notification/Notifications';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import Colors from '../constants/Colors';
import PhoneNumberSitter from '../screens/becomeSitter/PhoneNumber';
import SitterInitialScreen from '../screens/becomeSitter/InitialScreen';
import ProviderNavigator from './ProviderNavigator';
import InviteFriends from '../screens/Misc/InviteFriends';
import PromoGiftCodes from '../screens/Misc/PromoGiftCodes';
import ReceivePayments from '../screens/Misc/ReceivePayments';
import Gallery from '../screens/becomeSitter/Gallery/Gallery';
import GuestBottomTabNavigator from './GuestBottomTabNavigator';
import HomeProfile from '../screens/becomeSitter/HomeProfile';
import PetNavigator from './bottoms/PetNavigator';
import {_deleteSinglePet} from '../utils/helpers/HeaderWithBack/_deleteSinglePet';
import {Delete} from '../assets/svgs/SVG_LOGOS';
import {useAppDispatch} from '../store/store';
import SitterLandingPage from '../screens/becomeSitter/LandingPage';
import ServiceSetting from '../components/ScreenComponent/setting/subProfile/ServiceSetting';
import ProfileModify from '../components/ScreenComponent/setting/subProfile/ProfileModify';
import ManageBusiness from '../components/ScreenComponent/setting/subProfile/ManageBusiness';
import SchedulePetSettings from '../components/ScreenComponent/search/SchedulePetSettings';
import AddPetCheckScreen from '../screens/pet/AddPet/AddPetCheck';
import AddPetSubmit from '../screens/pet/AddPet/AddPetSubmit';
import AddPetHome from '../screens/pet/AddPet/AddPetHome';
import SitterDetails from '../screens/becomeSitter/Details';
import BasicInfo from '../screens/profile/BasicInfo';
import ServiceNavigator from './bottoms/ServiceNavigator';
import PaymentMethods from '../screens/profile/PaymentMethod';
import AddCardForm from '../components/ScreenComponent/profile/PaymentMethod/AddCardForm';
import BasicPayment from '../components/ScreenComponent/becomeSitter/subscription/BasicPayment/BasicPayment';
import Appointment from '../screens/Appointment';
import SubscriptionScreen from '../screens/becomeSitter/Subscription';
import ActivityScreen from '../screens/Inbox/activity/ActivityScreen';
import CheckoutDetails from '../screens/checkout/CheckoutDetails';
import ModifyAppointment from '../screens/Inbox/ModifyAppointment';

import ScreenSlider from '../components/ScreenComponent/search/ScreenSlider';
import ServiceSetUp from '../screens/becomeSitter/ServiceSetUp';
const Stack = createStackNavigator();

const MainNavigator = (props: {previousLoggedIn: Boolean}) => {
  const dispatch = useAppDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          props.previousLoggedIn ? 'BottomTabNavigator' : 'AuthNavigator'
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
          name="GuestBottomTabNavigator"
          component={GuestBottomTabNavigator}
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
          name="SitterLandingPage"
          component={SitterLandingPage}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Become A Sitter"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />

        <Stack.Screen
          name="SitterServiceNavigator"
          component={ServiceNavigator}
          options={() => ({
            headerShown: false,
            title: '',
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
          name="SitterBasicInfo"
          component={BasicInfo}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Basic Info" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SitterDetails"
          component={SitterDetails}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Details" />
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
              <HeaderWithBack navigation={navigation} title="Profile" />
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
          name="PetScreens"
          component={PetNavigator}
          options={() => ({
            title: '',
            headerShown: false,
            backgroundColor: Colors.primary,
          })}
        />
        {/* <Stack.Screen
          name="PetNavigatorFC"
          component={PetNavigatorFC}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        /> */}
        <Stack.Screen
          name="AddPetHome"
          component={AddPetHome}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="AddPetCheck"
          component={AddPetCheckScreen}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="AddPetSubmit"
          component={AddPetSubmit}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ServiceSetting"
          component={ServiceSetting}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Service Settings"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ProfileModify"
          component={ProfileModify}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Modify Accounts"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ManageBusiness"
          component={ManageBusiness}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Manage Business"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SchedulePetSettings"
          component={SchedulePetSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScreenSlider"
          component={ScreenSlider}
          options={{headerShown: false}}
        />
        {/* Payment Navigations */}
        <Stack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddCardForm"
          component={AddCardForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BasicPayment"
          component={BasicPayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethods}
          options={({navigation}) => ({
            title: 'Payment Cards',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Cards" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Appointment"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        {/* <Stack.Screen
          name="ActivityScreen"
          component={ActivityScreen}
        <Stack.Screen
          name="ServiceSelection"
          component={ServiceSelection}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Activity Screen"
                title="Service Selection"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })} */}
        {/* /> */}

        <Stack.Screen
          name="ActivityScreen"
          component={ActivityScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutDetails}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Checkout" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="EditDetails"
          component={ModifyAppointment}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Edit Details" />
            ),
          })}
        />
        <Stack.Screen
          name="ServiceSetUp"
          component={ServiceSetUp}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Service Set Up"
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
