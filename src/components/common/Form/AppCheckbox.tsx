import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Circle,
  CircleCheck,
  Square,
  SquareCheck,
} from '../../../assets/SVG_LOGOS';
import Text_Size from '../../../constants/textScaling';
interface Props {
  radio?: boolean;
  square?: boolean;
  title?: string;
  active?: boolean;
  onPress?: () => void;
  onBlur?: () => void;
}
const AppCheckbox = ({
  radio,
  square,
  title,
  active,
  onPress,
  onBlur,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} onBlur={onBlur}>
      <View style={styles.checkInfoContainer}>
        {square && (!active ? <Square /> : <SquareCheck />)}
        {radio && (!active ? <Circle /> : <CircleCheck />)}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppCheckbox;

const styles = StyleSheet.create({
  checkInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: Text_Size.Text_0,
  },
});
