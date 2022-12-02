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
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
        shadowColor: colors.descriptionText,
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
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
    elevation: 1,
    borderRadius: 10,
  },
});

export default Card;
