import React from 'react';
import Colors from '../../constants/Colors';
import ServiceMain from '../../screens/Service/SelectService';
import PetCareZipSearch from '../../screens/PetCareZipSearch';
import AllProvider from '../../screens/Service/AllProvider';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import {FilterIcon} from '../../assets/svgs/SVG_LOGOS';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../store/slices/openFilter';
import {createStackNavigator} from '@react-navigation/stack';
import ProviderAvailablity from '../../screens/provider/ProviderAvailablity';
import ServiceDetails from '../../components/ScreenComponent/Service/ServiceDetails';

const Stack1 = createStackNavigator();

const ServiceNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack1.Navigator initialRouteName="ProviderAvailablity">
      <Stack1.Screen
        name="PetCareZipSearch"
        component={PetCareZipSearch}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="ProviderAvailablity"
        component={ProviderAvailablity}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="ServiceMain"
        component={ServiceMain}
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
          headerShown: false,
          title: '',
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="ServiceDetails"
        component={ServiceDetails}
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
          headerShown: false,
          title: '',
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="AllProvider"
        component={AllProvider}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack
              navigation={navigation}
              title="All Provider"
              Icon={FilterIcon}
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
