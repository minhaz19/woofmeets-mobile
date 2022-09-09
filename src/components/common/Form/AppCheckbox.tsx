/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Circle_,
  CircleCheck,
  Square,
  SquareCheck,
} from '../../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../text/HeaderText';
import ShortText from '../text/ShortText';
interface Props {
  radio?: boolean;
  square?: boolean;
  title?: string;
  active?: boolean;
  onPress?: () => void;
  onBlur?: () => void;
  Comp?: React.ElementType;
  small?: boolean;
}
const AppCheckbox = ({
  onPress,
  onBlur,
  radio,
  square,
  title,
  active,
  Comp,
  small,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onBlur={onBlur}
      style={[
        styles.checkInfoContainer,
        {alignItems: small ? 'flex-start' : 'center'},
      ]}>
      <View style={{marginTop: small ? 1 : 0}}>
        {square && (!active ? <Square /> : <SquareCheck />)}
        {radio && (!active ? <Circle_ /> : <CircleCheck />)}
      </View>
      <View style={styles.textContainer}>
        {title && small ? (
          <ShortText text={title} textStyle={styles.shortTitle} />
        ) : (
          <HeaderText text={title} textStyle={styles.title} />
        )}
      </View>
      {Comp && <Comp />}
    </TouchableOpacity>
  );
};
export default AppCheckbox;

const styles = StyleSheet.create({
  checkInfoContainer: {
    flexDirection: 'row',
    width: '95%',
    flex: 1,
    marginVertical: 10,
  },
  textContainer: {marginRight: 10},
  title: {
    marginLeft: 10,
    fontSize: Text_Size.Text_0,
  },

  shortTitle: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: Text_Size.Text_0,
  },
});
