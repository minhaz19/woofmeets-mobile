/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
interface Props {
  onPress: () => void;
  children: React.ReactNode;
}
function AppTouchableOpacity({onPress, children}: Props) {
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
