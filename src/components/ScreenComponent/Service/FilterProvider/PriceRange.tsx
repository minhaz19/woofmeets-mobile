/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import AppInputRange from '../../../common/Form/AppInputRange';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
const PriceRange = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 10000]);
  const multiSliderValuesChange = (values: number[]) =>
    setMultiSliderValue(values);
  return (
    <View>
      <TitleText textStyle={styles.title} text="Rate Per Night" />
      <View style={[styles.labelContainer]}>
        <View style={styles.labelArrow} />
        <Text style={styles.label}>{multiSliderValue[0]} </Text>
        <Text style={styles.label}> {' - '}</Text>
        <Text style={styles.label}>{multiSliderValue[1]}</Text>
      </View>
      <View style={styles.rangeContainer}>
        <MultiSlider
          values={[multiSliderValue[0], multiSliderValue[1]]}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={10000}
          selectedStyle={styles.selectedStyle}
          unselectedStyle={styles.unselectedStyle}
          containerStyle={styles.containerStyle}
          trackStyle={styles.trackStyle}
          touchDimensions={styles.touchDimensions}
          markerOffsetY={1.5}
          customMarker={() => <View style={[styles.balls]} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rangeContainer: {flex: 1, marginHorizontal: 20},
  title: {
    fontSize: Text_Size.Text_0,
    fontWeight: 'bold',
    marginTop: 10,
  },
  balls: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.shadow,
    elevation: 5,
  },

  labelContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: SCREEN_WIDTH === 800 ? 20 : 10,
    paddingHorizontal: 10,
    flexDirection: 'row',

    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'relative',
  },
  labelArrow: {
    position: 'absolute',
    width: 25,
    height: 25,
    bottom: -3,
    transform: [{rotateY: '45deg'}, {rotateZ: '45deg'}],
    backgroundColor: Colors.primary,
    zIndex: -1,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  label: {
    fontSize: Text_Size.Text_1,
    color: Colors.background,
    zIndex: 100,
    alignSelf: 'center',
  },
  touchDimensions: {
    height: 40,
    width: 40,
    borderRadius: 20,
    slipDisplacement: 40,
  },
  trackStyle: {
    height: 6,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  containerStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: Colors.primary,
  },
  unselectedStyle: {
    backgroundColor: 'silver',
  },
});
export default memo(PriceRange);
