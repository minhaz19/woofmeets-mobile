import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import SettingMain from '../../screens/settings/SettingMain';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import MyAccount from '../../screens/settings/MyAccount';

const Stack1 = createStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="SettingMain">
      <Stack1.Screen
        name="SettingMain"
        component={SettingMain}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Settings" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="MyAccount"
        component={MyAccount}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Profile" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default SettingNavigator;
