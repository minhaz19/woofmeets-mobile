import React from 'react';
import Colors from '../../../constants/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../../components/common/header/Header';
import ProviderHome from '../../../screens/provider/Home/ProviderHome';

const Stack = createStackNavigator();

const ProHomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProviderHome">
      <Stack.Screen
        name="ProviderHome"
        component={ProviderHome}
        options={({navigation}) => ({
          header: () => (
            <Header
              navigation={navigation}
              title="Home"
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProHomeNavigator;
