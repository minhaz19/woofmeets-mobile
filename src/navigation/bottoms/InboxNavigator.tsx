import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import Inbox from '../../screens/Inbox';
import ActivityScreen from '../../screens/Inbox/activity/ActivityScreen';
import CheckoutDetails from '../../screens/checkout/CheckoutDetails';
import EditDetails from '../../screens/Inbox/editDetails';
import ReportCardInitial from '../../screens/reports/Initial';
import Appointment from '../../screens/Appointment';

const Stack1 = createStackNavigator();

const InboxNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="Inbox">
      <Stack1.Screen
        name="Inbox"
        component={Inbox}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Inbox"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="Appointment"
        component={Appointment}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack1.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack1.Screen
        name="Checkout"
        component={CheckoutDetails}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Checkout" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="EditDetails"
        component={EditDetails}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Edit Details" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ReportCardInitial"
        component={ReportCardInitial}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Reports" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default InboxNavigator;
