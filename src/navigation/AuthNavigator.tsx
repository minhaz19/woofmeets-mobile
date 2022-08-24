import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import SetNewPassword from '../screens/auth/ResetPassword';
import SignUp from '../screens/auth/SignUp';
import AfterIntroScreen from '../screens/AfterIntroScreen';
import VerifyAccount from '../screens/auth/VerifyAccount';
import ForgotPassword from '../screens/auth/ForgotPassword/ForgotPasswordEmail';
import ForgotPasswordOtp from '../screens/auth/ForgotPassword/ForgotPasswordOtp';
import GuestBottomTabNavigator from './GuestBottomTabNavigator';
import ForgotPasswordReset from '../screens/auth/ForgotPassword/ForgotPasswordReset';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="AfterIntroScreen">
      <Stack.Screen
        name="AfterIntroScreen"
        component={AfterIntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotPasswordOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordReset"
        component={ForgotPasswordReset}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={SetNewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GuestBottomTab"
        component={GuestBottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
