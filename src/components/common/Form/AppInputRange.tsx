/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TextInput, Text} from 'react-native';
import React, {useMemo, useRef} from 'react';
import Colors from '../../../constants/Colors';
import Svg, {Line} from 'react-native-svg';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Text_Size from '../../../constants/textScaling';
interface Props {
  minValue: number;
  maxValue: number;
  onChangeMin: (arg: number) => void;
  onChangeMax: (arg: number) => void;
}
const width = SCREEN_WIDTH - 80;

const {
  View: Aview,
  Value,
  event,
  set,
  block,
  cond,
  add,
  lessThan,
  greaterThan,
  eq,
  createAnimatedComponent,
  useCode,
  call,
} = Animated;
const MAX_WIDTH = width - 20;
const Aline = createAnimatedComponent(Line);
const AText = createAnimatedComponent(TextInput);
const usePanGesture = (initalValue: number) => {
  const transx = useRef(new Value(initalValue)).current;
  const offsetX = useRef(new Value(initalValue)).current;
  const onGestureHandle = useMemo(() => {
    return event([
      {
        nativeEvent: ({translationX: x, state}: any) =>
          block([
            cond(lessThan(add(offsetX, x), 0), set(transx, 0), [
              cond(
                greaterThan(add(offsetX, x), MAX_WIDTH),
                set(transx, MAX_WIDTH),
                set(transx, add(offsetX, x)),
              ),
            ]),
            cond(eq(state, State.END), [set(offsetX, add(offsetX, x))]),
          ]),
      },
    ]);
  }, [transx, offsetX]);
  return {transx, onGestureHandle};
};

const PanComponent = (initalValue: number) => {
  const {transx, onGestureHandle} = usePanGesture(initalValue);
  const Pan = () => (
    <PanGestureHandler
      onGestureEvent={onGestureHandle}
      onHandlerStateChange={onGestureHandle}>
      <Aview style={[styles.balls, {transform: [{translateX: transx}]}]} />
    </PanGestureHandler>
  );
  return {Pan, transx};
};
const AppInputRange = ({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
}: Props) => {
  const min = useRef(null);
  const max = useRef(null);
  const {Pan: Pan1, transx: x1} = PanComponent(0);
  const {Pan: Pan2, transx: x2} = PanComponent(MAX_WIDTH);
  useCode(
    () => [
      call([x1], ([value]) => {
        if (min.current) {
          onChangeMin(minValue + (value / MAX_WIDTH) * (maxValue - minValue));
          //@ts-ignore
          min.current.setNativeProps({
            text: `${Math.round(
              minValue + (value / MAX_WIDTH) * (maxValue - minValue),
            )}`,
          });
        }
      }),
    ],
    [x1],
  );
  useCode(
    () => [
      call([x2], ([value]) => {
        if (max.current) {
          onChangeMax(minValue + (value / MAX_WIDTH) * (maxValue - minValue));
          //@ts-ignore
          max.current.setNativeProps({
            text: `${Math.round(
              minValue + (value / MAX_WIDTH) * (maxValue - minValue),
            )}`,
          });
        }
      }),
    ],
    [x2],
  );
  console.log('getting size', SCREEN_WIDTH);
  return (
    <View style={styles.container}>
      <View style={styles.rangeBar} />
      <View style={styles.labelContainer}>
        <View style={styles.labelArrow} />
        <AText
          defaultValue={'0'}
          editable={false}
          ref={min}
          style={styles.label}
        />
        <Text style={styles.label}> {' - '}</Text>
        <AText
          defaultValue={MAX_WIDTH.toString()}
          editable={false}
          ref={max}
          style={styles.label}
        />
      </View>
      <View style={{position: 'absolute', alignSelf: 'center'}}>
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
      <Pan1 />
      <Pan2 />
    </View>
  );
};

export default AppInputRange;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
  rangeBar: {
    width: width,
    alignSelf: 'center',
    position: 'absolute',
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.gray,
  },
  balls: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 5,
    shadowColor: Colors.darkShadow,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
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
    color: Colors.background,
    zIndex: 100,
    alignSelf: 'center',
  },
});
