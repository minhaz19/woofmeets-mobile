import {StyleSheet, View} from 'react-native';
import React from 'react';
import {PetFoot, PetFootSvg} from '../../assets/SVG_LOGOS';

const FirstScreenSvg = () => {
  return (
    <View style={styles.petSvg}>
      <PetFootSvg height={30} width={30} fill={'#fa8b2d'} />
    </View>
  );
};

export default FirstScreenSvg;

const styles = StyleSheet.create({
  petSvg: {paddingRight: 150},
});
