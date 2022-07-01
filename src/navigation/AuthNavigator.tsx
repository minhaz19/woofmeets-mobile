import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import SetNewPassword from '../screens/auth/SetNewPassword';
import SignUp from '../screens/auth/SignUp';
import AfterIntroScreen from '../screens/AfterIntroScreen';

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
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUp}
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
