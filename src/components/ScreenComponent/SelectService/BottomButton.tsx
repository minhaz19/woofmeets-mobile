import {View, Platform, StyleSheet, GestureResponderEvent} from 'react-native';
import React from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const BottomButton = (props: {
  title: String | undefined;
  onSelect: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <View style={styles.buttonContainer}>
      <ButtonCom
        title={props.title}
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={props.onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    bottom:
      SCREEN_WIDTH <= 380
        ? Platform.OS === 'ios'
          ? 90
          : 65
        : Platform.OS === 'ios'
        ? 105
        : 125,
  },
});

export default BottomButton;
