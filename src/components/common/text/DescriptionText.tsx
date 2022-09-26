import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const DescriptionText = (props: {
  text: string;
  textStyle?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: string;
}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        numberOfLines={props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
        style={[
          styles.details,
          {color: colors.lightText},
          {...props.textStyle},
        ]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_0,
      fontFamily: 'Muli',
  },
});

export default DescriptionText;
