/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Platform,
  StyleSheet,
  GestureResponderEvent,
  Keyboard,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';

const BottomButton = (props: {
  title: String | undefined;
  onSelect: ((event: GestureResponderEvent) => void) | undefined;
  widthStyle?: ViewStyle;
}) => {
  const [keyboardShow, setKeyboardShow] = useState<boolean>();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          bottom: keyboardShow
            ? 0
            : SCREEN_WIDTH <= 380
            ? Platform.OS === 'ios'
              ? 90
              : 65
            : Platform.OS === 'ios'
            ? 95
            : 80,
        },
        {
          ...props?.widthStyle,
        },
      ]}>
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
