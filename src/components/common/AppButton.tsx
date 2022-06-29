import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {btnStyles} from '../../constants/buttonStyles';
import Text_Size from '../../constants/textScaling';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
interface Props {
  title: string;
  onPress: () => void;
}
const width = SCREEN_WIDTH;
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
    fontSize: width > 390 ? Text_Size.Text_1 : Text_Size.Text_0,

    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
