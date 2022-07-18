import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import SettingMain from '../../screens/settings/SettingMain';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import MyAccount from '../../screens/settings/MyAccount';
import BasicInfo from '../../screens/profile/BasicInfo';
import ContactScreen from '../../screens/profile/ContactScreen';

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
            <HeaderWithBack navigation={navigation} title="Settings" icon />
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
            <HeaderWithBack navigation={navigation} title="Profile" icon />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="BasicInfo"
        component={BasicInfo}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Basic Info" icon />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Contact" icon />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default SettingNavigator;
