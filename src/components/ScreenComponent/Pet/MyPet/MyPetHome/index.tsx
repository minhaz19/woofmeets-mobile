import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppButton from '../../../../common/AppButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AddPet} from '../../../../../assets/SVG_LOGOS';

type StackParamList = {
  AddPet: {foo: string; onBar: () => void} | undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>;
const MyPetHome = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={[styles.container]}>
      <AddPet width={300} height={300} />

      <View style={styles.btnStyle}>
        <AppButton
          title="Add Pet"
          onPress={() => navigation.navigate('AddPet')}
        />
      </View>
    </View>
  );
};

export default MyPetHome;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  btnStyle: {marginTop: 20},
});
