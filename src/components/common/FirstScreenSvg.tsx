import {StyleSheet, View} from 'react-native';
import React from 'react';
import {PetFoot} from '../../assets/SVG_LOGOS';

const FirstScreenSvg = () => {
  return (
    <View style={styles.petSvg}>
      <PetFoot height={40} width={40} fill={'#ba5604'} />
    </View>
  );
};

export default FirstScreenSvg;

const styles = StyleSheet.create({
  petSvg: {paddingRight: 150},
});
