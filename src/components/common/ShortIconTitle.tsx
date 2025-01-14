/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from './text/ShortText';
import Colors from '../../constants/Colors';
interface Props {
  Icon: any;
  text: string | number;
  color?: string;
  jCenter?: boolean;
  textStyle?: any;
}
const ShortIconTitle = ({
  Icon,
  textStyle,
  text,
  color,
  jCenter = false,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: jCenter ? 'center' : 'flex-start'},
      ]}>
      <Icon fill={Colors.primary} width={13} height={13} />
      <ShortText textStyle={{marginLeft: 3, ...textStyle}} text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default ShortIconTitle;
