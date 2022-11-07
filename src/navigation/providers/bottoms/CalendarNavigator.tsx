import React from 'react';
import Colors from '../../../constants/Colors';
import {createStackNavigator} from '@react-navigation/stack';
import RescheduleMain from '../../../screens/provider/Reschedule/RescheduleMain';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
import { FilterIcon } from '../../../assets/svgs/SVG_LOGOS';
import {setOpenFilter} from '../../../store/slices/misc/openFilter';
import { useAppDispatch } from '../../../store/store';
import ProviderAvailablity from '../../../screens/provider/ProviderAvailablity';

const Stack = createStackNavigator();

const CalendarNavigator = () => {
  const dispatch = useAppDispatch();
  return (
    <Stack.Navigator initialRouteName="RescheduleMain">
      <Stack.Screen
        name="ProviderAvailablity"
        component={ProviderAvailablity}
        options={({navigation}) => ({
          title: 'Provider Availability',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="Provider Availability"
              notification
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
