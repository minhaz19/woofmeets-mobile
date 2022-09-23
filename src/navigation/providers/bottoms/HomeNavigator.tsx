import React from 'react';
import Colors from '../../../constants/Colors';
import ServiceMain from '../../../screens/Service/SelectService';
import PetCareZipSearch from '../../../screens/PetCareZipSearch';
import AllProvider from '../../../screens/Service/AllProvider';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
import {FilterIcon} from '../../../assets/svgs/SVG_LOGOS';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../../store/slices/misc/openFilter';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProHomeNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="AllProvider">
      <Stack.Screen
        name="PetCareZipSearch"
        component={PetCareZipSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
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
      <Stack.Screen
        name="AllProvider"
        component={AllProvider}
        options={({navigation}) => ({
          title: 'All Provider',
          // header: () => (
          //   <HeaderWithBack
          //     navigation={navigation}
          //     title="All Provider"
          //     SecondIcon={FilterIcon}
          //     notification
          //     onPress={() => dispatch(setOpenFilter(true))}
          //   />
          // ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProHomeNavigator;
