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
import InviteFriends from '../screens/Misc/InviteFriends';
import PromoGiftCodes from '../screens/Misc/PromoGiftCodes';
import ReceivePayments from '../screens/Misc/ReceivePayments';
import Gallery from '../screens/becomeSitter/Gallery/Gallery';
import GuestBottomTabNavigator from './GuestBottomTabNavigator';
import HomeProfile from '../screens/becomeSitter/HomeProfile';
import PetNavigator from './bottoms/PetNavigator';
import {_deleteSinglePet} from '../utils/helpers/HeaderWithBack/_deleteSinglePet';
import {Delete, Setting} from '../assets/svgs/SVG_LOGOS';
import {useAppDispatch} from '../store/store';
import SitterLandingPage from '../screens/becomeSitter/LandingPage';
import ServiceSetting from '../components/ScreenComponent/setting/subProfile/ServiceSetting';
import ProfileModify from '../components/ScreenComponent/setting/subProfile/ProfileModify';
import ManageBusiness from '../components/ScreenComponent/setting/subProfile/ManageBusiness';
import SchedulePetSettings from '../components/ScreenComponent/search/SchedulePetSettings';
import AddPetCheckScreen from '../screens/pet/AddPet/AddPetCheck';
import AddPetSubmit from '../screens/pet/AddPet/AddPetSubmit';
import SitterDetails from '../screens/becomeSitter/Details';
import BasicInfo from '../screens/profile/BasicInfo';
import ServiceNavigator from './bottoms/ServiceNavigator';
import PaymentMethods from '../screens/profile/PaymentMethod';
import AddCardForm from '../components/ScreenComponent/profile/PaymentMethod/AddCardForm';
import BasicPayment from '../components/ScreenComponent/becomeSitter/subscription/BasicPayment/BasicPayment';
import Appointment from '../screens/Appointment';
import SubscriptionScreen from '../screens/becomeSitter/Subscription';
import ActivityScreen from '../screens/Inbox/activity/ActivityScreen';
import ScreenSlider from '../components/ScreenComponent/search/ScreenSlider';
import ServiceSetUp from '../screens/becomeSitter/ServiceSetUp';
import ServiceSelection from '../screens/becomeSitter/ServiceSelection';
import StripeOnboardScreen from '../screens/settings/Profile/StripeOnboardScreen';
import ProviderProfile from '../screens/Service/ProviderProfile';
import ProviderCalendar from '../screens/Service/ProviderCalender';
import SingleServiceLanding from '../components/ScreenComponent/setting/subProfile/service/SingleServiceLanding';
import Rates from '../screens/becomeSitter/ServiceSetUp/Rates';
import Availability from '../screens/becomeSitter/ServiceSetUp/Availability/Availability';
import CancellationPolicy from '../screens/becomeSitter/ServiceSetUp/CancellationPolicy/CancellationPolicy';
import AddPetHome from '../screens/pet/AddPet/AddPetHome';
import CheckoutDetails from '../screens/Inbox/checkout/CheckoutDetails';
import ModifyAppointment from '../screens/Inbox/ModifyAppointment';
import AppointmentSuccess from '../screens/Inbox/checkout/AppointmentSuccess';
import UpgradePlan from '../components/ScreenComponent/becomeSitter/subscription/UpgradePlan/UpgradePlan';
import SubscriptionList from '../screens/profile/SubscriptionList';
import AboutProvider from '../screens/Service/ProviderProfile/AboutProvider';
import ProviderAvailablity from '../screens/provider/ProviderAvailablity';
import {setOpenSettings} from '../store/slices/misc/openFilter';
import ReportCardInitial from '../screens/reports/Initial';
import GenerateReport from '../screens/reports/Initial/GenerateReport';
import ShowAllReport from '../screens/reports/ShowReport';
import ReportCard from '../screens/reports/Initial/ReportCard';
import AccountSetting from '../components/ScreenComponent/setting/Preference/AccountSetting';
import ReportSlots from '../screens/reports/Initial/ReportSlots';
import linking from '../utils/helpers/DeepLinking';
import {setReset} from '../store/slices/misc/trackingToggle';
import SeePetReview from '../components/ScreenComponent/Inbox/Details/SeePetReview';
import ScheduleAppointmentList from '../screens/provider/AppointmentScheduler/ScheduleAppointmentList';
import CompleteOnboarding from '../screens/becomeSitter/CompleteOnboarding';
import Room from '../components/ScreenComponent/conference/Room';
import {Alert} from 'react-native';
import {setPhoto} from '../store/slices/reportCard/reportCardSlice';
import OnboardingWebView from '../screens/WebView/Onboarding';
import NewServiceSelection from '../screens/becomeSitter/NewServiceSelection';
import ServiceSetupFlow from '../screens/becomeSitter/NewServiceSelection/ServiceSetupFlow';
import SingleServiceSetUp from '../components/ScreenComponent/becomeSitter/serviceSelection/SingleServiceSetUp';
const Stack = createStackNavigator();

const MainNavigator = (props: {previousLoggedIn: Boolean}) => {
  const dispatch = useAppDispatch();
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}
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
              <HeaderWithBack navigation={navigation} title="Become a Sitter" />
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
              <HeaderWithBack
                navigation={navigation}
                title="Profile"
                notification
              />
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
          name="GallerySitter"
          component={Gallery}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Profile"
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
          name="PetScreens"
          component={PetNavigator}
          options={() => ({
            title: '',
            headerShown: false,
            backgroundColor: Colors.primary,
          })}
        />
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
          name="SingleServiceLanding"
          component={SingleServiceLanding}
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
          name="RatesScreen"
          component={Rates}
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
          name="AvailabilityScreen"
          component={Availability}
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
          name="CancellationPolicyScreen"
          component={CancellationPolicy}
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
          name="AccountSetting"
          component={AccountSetting}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Setting"
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
          name="CompleteOnboarding"
          component={CompleteOnboarding}
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
              <HeaderWithBack
                navigation={navigation}
                title="Cards"
                notification
              />
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
        <Stack.Screen
          name="ActivityScreen"
          component={ActivityScreen}
          options={() => ({
            headerShown: false,
            gestureEnabled: false,
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
          name="StripeOnboardScreen"
          component={StripeOnboardScreen}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Get paid by woofmeets"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ProviderProfile"
          component={ProviderProfile}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Provider Profile"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="AboutProvider"
          component={AboutProvider}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack navigation={navigation} title="About Provider" />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ProviderCalendar"
          component={ProviderCalendar}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Calendar"
                notification={true}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="AppointmentSuccess"
          component={AppointmentSuccess}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="UpgradePlan"
          component={UpgradePlan}
          options={({navigation}) => ({
            header: () => (
              <HeaderWithBack navigation={navigation} title="Upgrade Plan" />
            ),
          })}
        />
        <Stack.Screen
          name="SubscriptionList"
          component={SubscriptionList}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Subscription List"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ReportCardInitial"
          component={ReportCardInitial}
          options={({navigation}) => ({
            title: '',
            headerShown: false,
            // header: () => (
            //   <HeaderWithBack navigation={navigation} title="Reports" />
            // ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="GenerateReport"
          component={GenerateReport}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Reports"
                notification
                alert={() => {
                  Alert.alert(
                    'Warning!',
                    'Are you sure you want to go back without generating the report?',
                    [
                      {
                        text: 'No',
                        onPress: () => {},
                      },
                      {
                        text: 'Yes',
                        onPress: async () => {
                          dispatch(setReset(false));
                          dispatch(setPhoto([]));
                          navigation.goBack();
                        },
                      },
                    ],
                  );
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ReportSlots"
          component={ReportSlots}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Reports"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ReportCard"
          component={ReportCard}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Reports"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ShowAllReport"
          component={ShowAllReport}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Reports"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SeePetReview"
          component={SeePetReview}
          options={({navigation}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Show pet review"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ProviderAvailablity"
          component={ProviderAvailablity}
          options={({navigation}) => ({
            title: 'Provider Availability',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Provider Availability"
                Icon={Setting}
                onPress={() => dispatch(setOpenSettings(true))}
                // notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ScheduleAppointmentList"
          component={ScheduleAppointmentList}
          options={({navigation}) => ({
            title: '',

            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Appointment List"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="OnboardingWebView"
          component={OnboardingWebView}
          options={({navigation}) => ({
            title: '',

            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Become a Sitter"
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewServiceSelection"
          component={NewServiceSelection}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title={'Become A Sitter'}
                notification
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="ServiceSetupFlow"
          component={ServiceSetupFlow}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                onPressBack={() => navigation.navigate('SitterInitialScreen')}
                title={
                  route?.params?.id === 1
                    ? 'Service Setup'
                    : route?.params?.id === 2
                    ? 'Profile Setup'
                    : route?.params?.id === 3
                    ? 'Submit Profile'
                    : 'Service Setup'
                }
                notification
                navigation={{
                  goBack() {
                    return null;
                  },
                  navigate: () => {
                    'SitterInitialScreen';
                  },
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack.Screen
          name="SingleServiceSetUp"
          component={SingleServiceSetUp}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
