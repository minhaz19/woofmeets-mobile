import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import PetCareZipSearch from '../../screens/search/PetCareZipSearch';
import AllProvider from '../../screens/Service/AllProvider';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import {FilterIcon} from '../../assets/svgs/SVG_LOGOS';
import {setOpenFilter} from '../../store/slices/misc/openFilter';
import {createStackNavigator} from '@react-navigation/stack';
import RealtimeLocation from '../../screens/RealtimeLocation';
import Header from '../../components/common/header/Header';
import ProviderAvailablity from '../../screens/provider/ProviderAvailablity';
import { useAppDispatch } from '../../store/store';
import authStorage from '../../utils/helpers/auth/storage';
import jwtDecode from 'jwt-decode';
const Stack1 = createStackNavigator();

const ServiceNavigator = () => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<any>();
  const getDecodedToken = async () => {
    const tok: any = await authStorage.getToken();
    if (tok) {
      const decode: any = await jwtDecode(tok);
      setToken(decode);
      return decode;
    }
  };
  getDecodedToken();
  return (
    <Stack1.Navigator initialRouteName="PetCareZipSearch">
      <Stack1.Screen
        name="PetCareZipSearch"
        component={PetCareZipSearch}
        options={({navigation}) => ({
          header: () => (
            token?.provider ? (
              <HeaderWithBack
                navigation={navigation}
                title="Services"
                notification
                onPress={() => dispatch(setOpenFilter(true))}
              />
            ) : (
              <Header
                navigation={navigation}
                title="Services"
                notification
                onPress={() => dispatch(setOpenFilter(true))}
              />
            )
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
