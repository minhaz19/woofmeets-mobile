import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import AllProvider from '../../screens/Service/AllProvider';
import {FilterIcon} from '../../assets/SVG_LOGOS';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../store/slices/openFilter';

const Stack1 = createStackNavigator();

const HomeNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack1.Navigator initialRouteName="details">
      {/* <Stack1.Screen
        name="HomeMain"
        component={HomeMain}
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
      /> */}
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

export default HomeNavigator;
