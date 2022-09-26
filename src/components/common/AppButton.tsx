import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import Text_Size from '../../constants/textScaling';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import TitleText from './text/TitleText';
interface Props {
  title: string;
  onPress?: () => void;
}
const width = SCREEN_WIDTH;
const AppButton = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnStyles.containerStyleFullWidth}>
      <TitleText textStyle={styles.title} text={title} />
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
    fontWeight: '600',
    color: Colors.primary,
  },
});
