import React from 'react';
import Colors from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import RescheduleMain from '../../../screens/provider/Reschedule/RescheduleMain';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
import { FilterIcon } from '../../../assets/svgs/SVG_LOGOS';
import {setOpenFilter} from '../../../store/slices/openFilter';

const Stack = createStackNavigator();

const ProRescheduleNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="RescheduleMain">
      <Stack.Screen
        name="RescheduleMain"
        component={RescheduleMain}
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
          title: '',
          header: ({navigation}) => (
            <HeaderWithBack
              navigation={navigation}
              title="Reschedule"
              notification
              onPress={() => dispatch(setOpenFilter(true))}
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProRescheduleNavigator;
