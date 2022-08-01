import React from 'react';
import {View, StyleSheet, ViewStyle, useColorScheme} from 'react-native';
import Colors from '../../constants/Colors';
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
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
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
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 1,
    borderRadius: 10,
  },
});

export default Card;
