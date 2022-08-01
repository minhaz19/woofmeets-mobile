import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProviderProfile from '../screens/Service/ProviderProfile';
import ProviderStoryStatus from '../screens/Service/ProviderStoryStatus';

const Stack = createStackNavigator();

function ProviderNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProviderProfile">
      <Stack.Screen
        name="ProviderProfile"
        component={ProviderProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProviderStoryStatus"
        component={ProviderStoryStatus}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ProviderNavigator;
