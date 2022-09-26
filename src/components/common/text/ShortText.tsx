import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const ShortText = (props: {
  children?: ReactNode;
  textStyle?: TextStyle;
  text: string | number | undefined;
}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[
          styles.details,
          {color: colors.lightText},
          {...props.textStyle},
        ]}>
        {props.text}
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_8,
    fontFamily: 'Muli',
  },
});

export default ShortText;
