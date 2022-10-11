import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';

const BottomTabText = (props: {
  focused: boolean;
  textStyle?: TextStyle;
  text: string | number;
  numberOfLines?: number;
}) => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        numberOfLines={props.numberOfLines}
        style={[
          styles.details,
          props.focused
            ? {color: Colors.primary, fontWeight: '700'}
            : {color: Colors.light.lightText, fontWeight: '500'},
          {...props.textStyle},
        ]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_8,
    fontFamily: 'Muli-Bold',
  },
});

export default BottomTabText;
