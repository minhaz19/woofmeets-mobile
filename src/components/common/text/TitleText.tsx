import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const TitleText = (props: {text: string; textStyle?: TextStyle}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        style={[
          styles.title,
          {color: colors.headerText},
          {...props.textStyle},
        ]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_9,
    fontWeight: '400',
  },
});

export default TitleText;