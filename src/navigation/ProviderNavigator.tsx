import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProviderProfile from '../screens/Service/ProviderProfile';
import ProviderStoryStatus from '../screens/Service/ProviderStoryStatus';
import ProviderCalendar from '../screens/Service/ProviderCalender';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import Colors from '../constants/Colors';

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
    </Stack.Navigator>
  );
}

export default ProviderNavigator;
