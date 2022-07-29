import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../../constants/theme/hooks/useTheme';

const Card = (props: {
  style?: ViewStyle | null | undefined;
  containerStyle?: ViewStyle | null | undefined;
  basicStyle?: ViewStyle | null | undefined;
  children?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}): JSX.Element => {
  const {isDarkMode, colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: isDarkMode
          ? colors.lightBackgroundColor
          : colors.backgroundColor,
        shadowColor: colors.headerText,
        ...styles.card,
        ...props.style,
        ...props.containerStyle,
        ...props.basicStyle,
      }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 10,
  },
});

export default Card;
