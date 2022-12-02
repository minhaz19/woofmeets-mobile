import {
  View,
  StyleSheet,
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';

const ScreenRapper = (props: {
  rapperStyle?: ViewStyle;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
        props?.rapperStyle,
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenRapper;
