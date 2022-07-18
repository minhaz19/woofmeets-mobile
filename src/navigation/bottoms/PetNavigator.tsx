import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import MyPet from '../../screens/pet/MyPet';
import AddPet from '../../screens/pet/AddPet';

const Stack1 = createStackNavigator();

const PetNavigator = () => {
  return (
    <Stack1.Navigator initialRouteName="MyPet">
      <Stack1.Screen
        name="MyPet"
        component={MyPet}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="My Pet" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
      <Stack1.Screen
        name="AddPet"
        component={AddPet}
        options={({navigation}) => ({
          title: '',
          header: () => (
            <HeaderWithBack navigation={navigation} title="Add pet" />
          ),
          backgroundColor: Colors.primary,
        })}
      />
    </Stack1.Navigator>
  );
};

export default PetNavigator;
