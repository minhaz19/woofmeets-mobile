import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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
}
const AppCheckbox = ({radio = true, square}: Props) => {
  const [checkSq, setCheckSq] = useState(false);
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setCheckSq(!checkSq)}>
      <View style={styles.checkInfoContainer}>
        {square && (!checkSq ? <Square /> : <SquareCheck />)}
        {radio && (!checkSq ? <Circle /> : <CircleCheck />)}
        <Text style={styles.title}>Something</Text>
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
