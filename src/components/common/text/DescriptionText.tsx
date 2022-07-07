import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const DescriptionText = (props: {text: string; textStyle?: TextStyle}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        style={[
          styles.details,
          {color: colors.headerText},
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
  },
});

export default DescriptionText;
