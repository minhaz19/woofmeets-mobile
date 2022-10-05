/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Pressable, TextStyle} from 'react-native';
interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  style?: TextStyle | any;
  onLongPress?: () => void;
}
function AppTouchableOpacity({onPress, style, children, onLongPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) => [style, {opacity: pressed ? 0.5 : 1}]}>
      {children}
    </Pressable>
  );
}
export default AppTouchableOpacity;
const styles = StyleSheet.create({});
