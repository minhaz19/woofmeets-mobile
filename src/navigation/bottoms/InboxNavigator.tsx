import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import Inbox from '../../screens/Inbox';
// import ReportCardInitial from '../../screens/reports/Initial';
// import Appointment from '../../screens/Appointment';
// import GenerateReport from '../../screens/reports/Initial/GenerateReport';
// import ReportCard from '../../screens/reports/Initial/ReportCard';
// import ShowAllReport from '../../screens/reports/ShowReport';

const Stack1 = createStackNavigator();

const InboxNavigator = () => {
  return (
    <Stack1.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
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
      {/* <Stack1.Screen
        name="Appointment"
        component={Appointment}
        options={() => ({
          headerShown: false,
        })}
      /> */}
      {/* <Stack1.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={() => ({
          headerShown: false,
        })}
      /> */}
      {/* <Stack1.Screen
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
      /> */}
      {/* <Stack1.Screen
        name="ReportCardInitial"
        component={ReportCardInitial}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Reports" />
          ),
          backgroundColor: Colors.primary,
        })}
      /> */}
      {/* <Stack1.Screen
        name="ShowAllReport"
        component={ShowAllReport}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Reports" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="GenerateReport"
        component={GenerateReport}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Reports" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ReportCard"
        component={ReportCard}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Reports" />
          ),
          backgroundColor: Colors.primary,
        })}
      /> */}
    </Stack1.Navigator>
  );
};

export default InboxNavigator;
