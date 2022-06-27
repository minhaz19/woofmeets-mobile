import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHome from '../screens/auth/AuthHome';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthHomeScreen">
      <Stack.Screen
        name="AuthHomeScreen"
        component={AuthHome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
