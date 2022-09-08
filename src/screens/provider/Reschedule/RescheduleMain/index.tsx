import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const RescheduleMain = () => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <Text>index</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default RescheduleMain;
