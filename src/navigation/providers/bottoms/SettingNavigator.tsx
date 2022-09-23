import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../../constants/Colors';
import SettingMain from '../../../screens/settings/SettingMain';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
import MyAccount from '../../../screens/settings/MyAccount';
import BasicInfo from '../../../screens/profile/BasicInfo';
import ContactScreen from '../../../screens/profile/ContactScreen';
import Preference from '../../../screens/settings/Preference';
import AccountSetting from '../../../components/ScreenComponent/setting/Preference/AccountSetting';
import CreditAndDebitCard from '../../../screens/checkout/CreditAndDebitCard';
import SetNewPassword from '../../../screens/auth/ResetPassword';
import Profile from '../../../screens/settings/Profile';
import BasicBackgroundCheck from '../../../components/ScreenComponent/becomeSitter/subscription/BasicBackgroundCheck';
import PlanCheckout from '../../../components/ScreenComponent/becomeSitter/subscription/PlanCheckout';

const Stack1 = createStackNavigator();

const ProSettingNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="SettingMain">
      <Stack1.Screen
        name="SettingMain"
        component={SettingMain}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Settings"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="BasicBackgroundCheck"
        component={BasicBackgroundCheck}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Background Check"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="PlanCheckout"
        component={PlanCheckout}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Checkout"
              notification
            />
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
            <HeaderWithBack
              navigation={navigation}
              title="Profile"
              notification
            />
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
            <HeaderWithBack
              navigation={navigation}
              title="Basic Info"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ResetPassword"
        component={SetNewPassword}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Basic Info"
              notification
            />
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
            <HeaderWithBack
              navigation={navigation}
              title="Contact"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="Preference"
        component={Preference}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Preference"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Setting"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="CreditAndDebitCard"
        component={CreditAndDebitCard}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Checkout"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Checkout"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default ProSettingNavigator;
