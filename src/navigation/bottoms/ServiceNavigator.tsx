import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import ServiceMain from '../../screens/SelectService';
import ServiceDetails from '../../components/ScreenComponent/SelectService/ServiceDetails';
import PetCareZipSearch from '../../screens/PetCareZipSearch';

const Stack1 = createStackNavigator();

const ServiceNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="PetCareZipSearch">
      <Stack1.Screen
        name="PetCareZipSearch"
        component={PetCareZipSearch}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="ServiceMain"
        component={ServiceMain}
        options={() => ({
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
          headerShown: false,
          title: '',
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={() => ({
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
          headerShown: false,
          title: '',
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default ServiceNavigator;
