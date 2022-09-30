import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
type Props = {
  children: React.ReactNode;
  style?: ViewStyle | any;
};
const Screen = ({children, style}: Props) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  view: {
    flex: 1,
  },
});
