/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../constants/Colors';
import Svg, {Line} from 'react-native-svg';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import Text_Size from '../../../constants/textScaling';
import {useCodeCom} from '../../../utils/helpers/PriceRange/useCode';
import {PanComponent} from '../../../utils/helpers/PriceRange/PanComponent';
import TitleText from '../text/TitleText';
interface Props {
  minValue: number;
  maxValue: number;
  onChangeMin: (arg: number) => void;
  onChangeMax: (arg: number) => void;
}
const width = SCREEN_WIDTH - 80;
const MAX_WIDTH = width - 20;

const {createAnimatedComponent} = Animated;
const Aline = createAnimatedComponent(Line);
const AText = createAnimatedComponent(TextInput);

const AppInputRange = ({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
}: Props) => {
  const {Pan: Pan1, transx: x1} = PanComponent(0, MAX_WIDTH);
  const {Pan: Pan2, transx: x2} = PanComponent(MAX_WIDTH, MAX_WIDTH);
  const {offset, min, max} = useCodeCom(
    minValue,
    maxValue,
    onChangeMin,
    onChangeMax,
    x1,
    x2,
    MAX_WIDTH,
  );
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: true
            ? (offset.value / 100) * 50 - 145
            : (offset.value / 100) * 50,
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.rangeBar} />
        <Animated.View style={[styles.labelContainer, animatedStyles]}>
          <View style={styles.labelArrow} />
          <AText
            defaultValue={'0'}
            editable={false}
            ref={min}
            style={styles.label}
          />
          <TitleText text=" - " textStyle={styles.label} />
          <AText
            defaultValue={'200'}
            editable={false}
            ref={max}
            style={styles.label}
          />
        </Animated.View>

        <View style={styles.svgLine}>
          <Svg height="6" width={width}>
            <Aline
              stroke={Colors.primary}
              strokeWidth={12}
              x1={x1}
              y1={0}
              x2={x2}
              y2={0}
            />
          </Svg>
        </View>
        {/* <TouchableOpacity onPress={() => setActive(false)}> */}
        <Pan1 />
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => setActive(true)}> */}
        <Pan2 />
        {/* </TouchableOpacity> */}
      </View>
    </GestureHandlerRootView>
  );
};

export default AppInputRange;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center',
    marginBottom: 20,
    height: 60,
  },
  rangeBar: {
    width: width,
    alignSelf: 'center',
    position: 'absolute',
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.gray,
  },
  svgLine: {position: 'absolute', alignSelf: 'center'},
  labelContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: SCREEN_WIDTH === 390 ? 10 : 0,
    paddingHorizontal: 10,

    flexDirection: 'row',
    top: -40,
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
  label: {
    fontSize: Text_Size.Text_1,
    zIndex: 100,
    alignSelf: 'center',
  },
});
