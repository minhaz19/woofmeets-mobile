import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {usePanGesture} from './usePanGesture';

const {View} = Animated;

export const PanComponent = (initalValue: number, MAX_WIDTH: number) => {
  const {transx, onGestureHandle} = usePanGesture(initalValue, MAX_WIDTH);
  const Pan = () => (
    <PanGestureHandler
      onGestureEvent={onGestureHandle}
      onHandlerStateChange={onGestureHandle}>
      <View style={[styles.balls, {transform: [{translateX: transx}]}]} />
    </PanGestureHandler>
  );
  return {Pan, transx};
};
const styles = StyleSheet.create({
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
});
