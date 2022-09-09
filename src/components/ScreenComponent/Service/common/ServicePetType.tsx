/* eslint-disable prettier/prettier */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  CircleCheck,
  Circle_,
  Square,
  SquareCheck,
} from '../../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../common/text/DescriptionText';

interface Props {
  radio?: boolean;
  square?: boolean;
  title: string;
}
const ServicePetType = ({radio, square, title}: Props) => {
  const [checkSq, setCheckSq] = useState(false);
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setCheckSq(!checkSq)}>
      <View style={styles.checkInfoContainer}>
        {square && (!checkSq ? <Square /> : <SquareCheck />)}
        {radio && (!checkSq ? <Circle_ /> : <CircleCheck />)}
        <DescriptionText textStyle={styles.title} text={title} />
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
  },
});
