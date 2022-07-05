/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Screen from '../../common/Screen';

interface Props {
  itemId: string;
}

const ServiceDetails: FC<Props> = ({itemId}) => {
  console.log('hello', itemId);
  const {colors} = useTheme();
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <Text>ServiceDetails</Text>
    </Screen>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {flex: 1},
});
