import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HomeMain from '../../screens/Home/Home';

const Stack1 = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="HomeMain">
      <Stack1.Screen
        name="HomeMain"
        component={HomeMain}
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

export default HomeNavigator;
