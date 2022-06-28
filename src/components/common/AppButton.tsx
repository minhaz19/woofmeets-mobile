import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {btnStyles} from '../../constants/buttonStyles';
import Text_Size from '../../constants/textScaling';
interface Props {
  title: string;
  onPress: () => void;
}
const AppButton = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnStyles.containerStyleFullWidth}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_0,
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: 'white',
  },
});
