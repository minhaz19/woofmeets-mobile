import {StyleSheet} from 'react-native';
import React from 'react';
import MyPetHome from '../../../components/ScreenComponent/Pet/MyPet/MyPetHome';
import Screen from '../../../components/common/Screen';
import HeaderWithBack from '../../../components/common/header/HeaderWithBack';
interface Props {
  navigation: {
    goBack: () => void;
  };
}
const MyPet = ({navigation}: Props) => {
  return (
    <Screen style={styles.container}>
      <HeaderWithBack title="Add Pet" navigation={navigation} />
      <MyPetHome />
    </Screen>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
