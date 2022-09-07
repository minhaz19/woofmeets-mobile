import React from 'react';
import Colors from '../../constants/Colors';
import HeaderWithBack from '../../components/common/header/HeaderWithBack';
import MyPet from '../../screens/pet/MyPet';
import AddPet from '../../screens/pet/AddPet';
import {createStackNavigator} from '@react-navigation/stack';
import {Delete} from '../../assets/svgs/SVG_LOGOS';
import {useAppDispatch} from '../../store/store';
import {_deleteSinglePet} from '../../utils/helpers/HeaderWithBack/_deleteSinglePet';

const Stack1 = createStackNavigator();

const PetNavigator = () => {
  const dispatch = useAppDispatch();
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

export default PetNavigator;
