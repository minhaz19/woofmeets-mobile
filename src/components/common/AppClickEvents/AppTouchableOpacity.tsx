/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Pressable, TextStyle} from 'react-native';
interface Props {
  onPress: () => void;
  children: React.ReactNode;
  style?: TextStyle;
}
function AppTouchableOpacity({onPress, style, children}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
      {children}
    </Pressable>
  );
}
export default AppTouchableOpacity;
const styles = StyleSheet.create({});
