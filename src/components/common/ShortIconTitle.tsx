/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ShortText from './text/ShortText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
interface Props {
  Icon: any;
  text: string | number;
  color?: string;
}
const ShortIconTitle = ({Icon, text, color}: Props) => {
  const {isDarkMode} = useTheme();
  return (
    <View style={styles.container}>
      <Icon fill={isDarkMode ? 'white' : 'black'} />
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
