import React from 'react';
import Colors from '../constants/Colors';
import HeaderWithBack from '../components/common/header/HeaderWithBack';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch} from '../store/store';
import {_deleteSinglePet} from '../utils/helpers/HeaderWithBack/_deleteSinglePet';
import {Delete} from '../assets/svgs/SVG_LOGOS';
import AddPetHome from '../screens/pet/AddPet/AddPetHome';
import AddPetCheckScreen from '../screens/pet/AddPet/AddPetCheck';
import AddPetSubmit from '../screens/pet/AddPet/AddPetSubmit';

const Stack1 = createStackNavigator();

const PetNavigatorFC = () => {
  const dispatch = useAppDispatch();
  return (
      <Stack1.Navigator initialRouteName="AddPetHome">
        <Stack1.Screen
          name="AddPetHome"
          component={AddPetHome}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack1.Screen
          name="AddPetCheck"
          component={AddPetCheckScreen}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
        <Stack1.Screen
          name="AddPetSubmit"
          component={AddPetSubmit}
          options={({navigation, route}) => ({
            title: '',
            header: () => (
              <HeaderWithBack
                navigation={navigation}
                title="Add pet"
                Icon={route.params!.opk && Delete}
                onPress={() => {
                  _deleteSinglePet(dispatch, navigation, route);
                }}
              />
            ),
            backgroundColor: Colors.primary,
          })}
        />
      </Stack1.Navigator>
   
  );
};

export default PetNavigatorFC;
