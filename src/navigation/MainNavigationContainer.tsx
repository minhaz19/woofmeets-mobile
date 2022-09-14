import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import Notifications from '../screens/notification/Notifications';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import Colors from '../constants/Colors';
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
import GuestBottomTabNavigator from './GuestBottomTabNavigator';
import ServiceSetUp from '../screens/becomeSitter/ServiceSetUp';
import HomeProfile from '../screens/becomeSitter/HomeProfile';
import Rates from '../screens/becomeSitter/ServiceSetUp/Rates';
import SitterLandingPage from '../screens/becomeSitter/LandingPage';
import CreateProfileLanding from '../screens/becomeSitter/CreateProfileLanding';
import BasicInfo from '../screens/profile/BasicInfo';
import ContactScreen from '../screens/profile/ContactScreen';
import PetNavigator from './bottoms/PetNavigator';
import PetPreference from '../screens/becomeSitter/ServiceSetUp/PetPreference';
import SitterDetails from '../screens/becomeSitter/Details';
import CancellationPolicy from '../screens/becomeSitter/ServiceSetUp/CancellationPolicy';
import YourHome from '../screens/becomeSitter/ServiceSetUp/YourHome';
import Availability from '../screens/becomeSitter/ServiceSetUp/Availability/Availability';
import SafetyQuiz from '../screens/becomeSitter/SafetyQuiz';
import SubscriptionScreen from '../screens/becomeSitter/Subscription';
import { _deleteSinglePet } from '../utils/helpers/HeaderWithBack/_deleteSinglePet';
import AddPet from '../screens/pet/AddPet';
import { Delete } from '../assets/svgs/SVG_LOGOS';
import { useAppDispatch } from '../store/store';
const Stack = createStackNavigator();

const MainNavigator = (props: {previousLoggedIn: Boolean}) => {
  const dispatch = useAppDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          // !props.previousLoggedIn ? 'BottomTabNavigator' : 'HomeProfile'
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
              <HeaderWithBack navigation={navigation} title="Profile" />
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
          name="ServiceSetup"
          component={ServiceSetUp}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Service Setup"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="Rates"
          component={Rates}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Service Setup" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="Availability"
          component={Availability}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Service Setup" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="PetPreference"
          component={PetPreference}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Service Setup" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="CancellationPolicy"
          component={CancellationPolicy}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Service Setup" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="YourHome"
          component={YourHome}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Service Setup" />
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
          name="CreateProfileLanding"
          component={CreateProfileLanding}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Create Your Profile"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SafetyQuiz"
          component={SafetyQuiz}
          options={({navigation}) => ({
            headerStyle: {
              backgroundColor: Colors.background,
              borderWidth: 0,
              borderColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
              textAlign: 'center',
            },
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="Safety Quiz" />
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
              <HeaderWithBack
                navigation={navigation}
                title="Basic Info"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SitterContactScreen"
          component={ContactScreen}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Contact"
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
        <Stack.Screen
          name="SitterDetails"
          component={SitterDetails}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Details"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Subscription"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="AddPet"
          component={AddPet}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
