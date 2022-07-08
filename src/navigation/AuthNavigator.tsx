import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import SetNewPassword from '../screens/auth/SetNewPassword';
import SignUp from '../screens/auth/SignUp';
import AfterIntroScreen from '../screens/AfterIntroScreen';
import VerifyAccount from '../screens/auth/VerifyAccount';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ForgotPasswordOtp from '../screens/auth/ForgotPasswordOtp';

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
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotPasswordOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetNewPassword"
        component={SetNewPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
