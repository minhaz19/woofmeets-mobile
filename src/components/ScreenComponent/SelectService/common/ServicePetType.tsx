/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import {
  CircleCheck,
  Circle_,
  Square,
  SquareCheck,
} from '../../../../assets/SVG_LOGOS';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  radio?: boolean;
  square?: boolean;
  title?: string;
}
const ServicePetType = ({radio, square, title}: Props) => {
  const [checkSq, setCheckSq] = useState(false);
  const {colors} = useTheme();
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setCheckSq(!checkSq)}>
      <View style={styles.checkInfoContainer}>
        {square && (!checkSq ? <Square /> : <SquareCheck />)}
        {radio && (!checkSq ? <Circle_ /> : <CircleCheck />)}
        <Text style={[styles.title, {color: colors.descriptionText}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ServicePetType;
const styles = StyleSheet.create({
  checkInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: Text_Size.Text_0,
  },
});
