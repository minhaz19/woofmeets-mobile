import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

interface Props {
  radio?: boolean;
  square?: boolean;
  title?: string;
}
const ServicePetType = ({radio, square, title}: Props) => {
  const [checkSq, setCheckSq] = useState(false);
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setCheckSq(!checkSq)}>
      <View style={styles.checkInfoContainer}>
        {/* {square && (!checkSq ? <Square /> : <SquareCheck  />)}
        {radio && (!checkSq ? <Circle /> : <CircleCheck />)} */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ServicePetType;
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
