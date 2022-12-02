/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {Slider} from '@miblanchard/react-native-slider';
import {setMultiSliderValue} from '../../../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
  multiSliderValue: any;
}
const PriceRange = ({multiSliderValue}: Props) => {
  const dispatch = useAppDispatch();
  const multiSliderValuesChange = (values: any) => {
    dispatch(setMultiSliderValue(values));
  };
  return (
    <View>
      <TitleText textStyle={styles.title} text="Rate Per Night" />
      <View style={[styles.labelContainer]}>
        <View style={styles.labelArrow} />
        <TitleText textStyle={styles.label} text={multiSliderValue[0]} />
        <TitleText textStyle={styles.label} text={' - '} />
        <TitleText textStyle={styles.label} text={multiSliderValue[1]} />
      </View>
      <View style={styles.rangeContainer}>
        <Slider
          trackClickable={true}
          animateTransitions={true}
          value={[multiSliderValue[0], multiSliderValue[1]]}
          minimumValue={0}
          maximumValue={200}
          trackMarks={[0, 10]}
          step={1}
          thumbTouchSize={{width: 30, height: 30}}
          thumbTintColor={Colors.primary}
          thumbStyle={{
            borderColor: Colors.primary,
            borderWidth: 0.5,
          }}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor="#CECECE"
          trackStyle={{
            height: 3,
          }}
          // onValueChange={value => {
          //   multiSliderValuesChange(value);
          // }}
          onSlidingComplete={value => multiSliderValuesChange(value)}
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
