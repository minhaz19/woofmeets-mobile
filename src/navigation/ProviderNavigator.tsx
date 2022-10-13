import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProviderProfile from '../screens/Service/ProviderProfile';
import ProviderCalendar from '../screens/Service/ProviderCalender';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import Colors from '../constants/Colors';
import Appointment from '../screens/Appointment';

const Stack = createStackNavigator();

function ProviderNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProviderProfile">
      <Stack.Screen
        name="ProviderProfile"
        component={ProviderProfile}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Provider Profile" />
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
              title="Create Appointment"
            />
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
    </Stack.Navigator>
  );
}

export default ProviderNavigator;
