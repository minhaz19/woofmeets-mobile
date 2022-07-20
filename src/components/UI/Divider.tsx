import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import {useTheme} from '../../constants/theme/hooks/useTheme';

const Divider = () => {
  const {colors} = useTheme();
  return (
    <View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '2%',
  },
});

export default Divider;
