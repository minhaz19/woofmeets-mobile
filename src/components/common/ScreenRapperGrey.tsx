import {View, StyleSheet, ViewStyle, useColorScheme} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const ScreenRapperGrey = (props: {
  rapperStyle?: ViewStyle;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: Colors.light.inputBackground,
  };
  return (
    <View style={[styles.container, backgroundStyle, props?.rapperStyle]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenRapperGrey;
