import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import ShortText from '../text/ShortText';
interface Props {
  error: string | undefined | any;
  auth?: boolean;
}
const ErrorMessage = ({error, auth}: Props) => {
  const {isDarkMode, colors} = useTheme();
  if (!error) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            auth && isDarkMode ? Colors.dark.lightDark : colors.backgroundColor,
        },
      ]}>
      <ShortText textStyle={{...styles.error, color: colors.alert}} text={error} />
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {},
  error: {
    marginBottom: 10,
    marginTop: 5,
  },
});
