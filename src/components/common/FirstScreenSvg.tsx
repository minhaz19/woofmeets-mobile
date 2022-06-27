import {StyleSheet, View} from 'react-native';
import React from 'react';
import PetSvg from '../../assets/splash/svg_icon';

const FirstScreenSvg = () => {
  return (
    <View style={{paddingRight: 150}}>
      <PetSvg height={30} width={30} fill={'#FF8B3D'} />
    </View>
  );
};

export default FirstScreenSvg;

const styles = StyleSheet.create({});
