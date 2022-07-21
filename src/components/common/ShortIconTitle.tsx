/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from './text/ShortText';
interface Props {
  Icon: any;
  text: string | number;
  color?: string;
}
const ShortIconTitle = ({Icon, text, color}: Props) => {
  return (
    <View style={styles.container}>
      <Icon />
      <ShortText
        textStyle={{marginLeft: 3, color: color && color}}
        text={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
});
export default ShortIconTitle;
