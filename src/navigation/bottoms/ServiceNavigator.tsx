import React from 'react';
import Colors from '../../constants/Colors';
import PetCareZipSearch from '../../screens/search/PetCareZipSearch';
import AllProvider from '../../screens/Service/AllProvider';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import {FilterIcon} from '../../assets/svgs/SVG_LOGOS';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../store/slices/misc/openFilter';
import {createStackNavigator} from '@react-navigation/stack';
import RealtimeLocation from '../../screens/RealtimeLocation';
import Header from '../../components/common/header/Header';
import ProviderAvailablity from '../../screens/provider/ProviderAvailablity';
const Stack1 = createStackNavigator();

const ServiceNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack1.Navigator initialRouteName="PetCareZipSearch">
      <Stack1.Screen
        name="PetCareZipSearch"
        component={PetCareZipSearch}
        options={({navigation}) => ({
          header: () => (
            <Header
              navigation={navigation}
              title="Services"
              SecondIcon={FilterIcon}
              notification
              onPress={() => dispatch(setOpenFilter(true))}
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />

      <Stack1.Screen
        name="ProviderAvailablity"
        component={ProviderAvailablity}
        options={{headerShown: false}}
      />

      <Stack1.Screen
        name="RealtimeLocation"
        component={RealtimeLocation}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="AllProvider"
        component={AllProvider}
        options={({navigation}) => ({
          title: 'All Provider',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="All Provider"
              SecondIcon={FilterIcon}
              notification
              onPress={() => dispatch(setOpenFilter(true))}
            />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default ServiceNavigator;
