import React from 'react';
import Colors from '../../../constants/Colors';
import {createStackNavigator} from '@react-navigation/stack';
// import Header from '../../../components/common/header/Header';
// import ProviderHome from '../../../screens/provider/Home/ProviderHome';
// import ActivityScreen from '../../../screens/Inbox/activity/ActivityScreen';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
import Scheduler from '../../../screens/provider/AppointmentScheduler';
import ScheduleAppointmentList from '../../../screens/provider/AppointmentScheduler/ScheduleAppointmentList';

const Stack = createStackNavigator();

const ProHomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProviderHome">
      <Stack.Screen
        name="ProviderHome"
        component={Scheduler}
        options={({}) => ({
          headerShown: false,
          // header: () => (
          //   <HeaderWithBack
          //     navigation={navigation}
          //     title="Appointments"
          //     notification
          //   />
          // ),
          backgroundColor: Colors.primary,
        })}
      />
      {/* <Stack.Screen
        name="ScheduleAppointmentList"
        component={ScheduleAppointmentList}
        options={({navigation}) => ({
          title: '',

          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Appointment List"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      /> */}
      {/* <Stack.Screen
        name="OngoingActivityScreen"
        component={ActivityScreen}
        options={({navigation}) => ({
          title: '',
          headerShown: false,
          backgroundColor: Colors.primary,
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default ProHomeNavigator;
