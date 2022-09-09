import {StyleSheet, View} from 'react-native';
import React from 'react';
import {PetFootSvg} from '../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const FirstScreenSvg = () => {
  return (
    <View style={styles.petSvg}>
      <PetFootSvg
        height={SCREEN_WIDTH <= 380 ? 30 : 42}
        width={SCREEN_WIDTH <= 380 ? 30 : 42}
        fill={'#fa8b2d'}
      />
    </View>
  );
};

export default FirstScreenSvg;

const styles = StyleSheet.create({
  petSvg: {paddingRight: 150},
});
