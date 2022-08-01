import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import Inbox from '../../screens/Inbox';
import ActivityScreen from '../../screens/Inbox/activity/ActivityScreen';

const Stack1 = createStackNavigator();

const InboxNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="details">
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
        name="ActivityScreen"
        component={ActivityScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack1.Navigator>
  );
};

export default InboxNavigator;
