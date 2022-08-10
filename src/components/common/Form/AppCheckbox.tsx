/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {
  Circle_,
  CircleCheck,
  Square,
  SquareCheck,
} from '../../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../text/HeaderText';
interface Props {
  radio?: boolean;
  square?: boolean;
  title?: string;
  active?: boolean;
  onPress?: () => void;
  onBlur?: () => void;
}
const AppCheckbox = ({
  onPress,
  onBlur,
  radio,
  square,
  title,
  active,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onBlur={onBlur}
      style={styles.checkInfoContainer}>
      {square && (!active ? <Square /> : <SquareCheck />)}
      {radio && (!active ? <Circle_ /> : <CircleCheck />)}
      <HeaderText text={title} textStyle={styles.title} />
    </TouchableOpacity>
  );
};

export default memo(AppCheckbox);

const styles = StyleSheet.create({
  checkInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: Text_Size.Text_0,
  },
});
