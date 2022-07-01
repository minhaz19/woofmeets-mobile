import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SetNewPassword from '../screens/auth/SetNewPassword';
// import Login from '../screens/auth/Login';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthHomeScreen">
      <Stack.Screen
        name="AuthHomeScreen"
        component={SetNewPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
