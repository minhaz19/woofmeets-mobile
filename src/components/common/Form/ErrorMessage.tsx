import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {FormikErrors, FormikTouched} from 'formik';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
interface Props {
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  visible: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  auth?: boolean;
}
const ErrorMessage = ({error, visible, auth}: Props) => {
  const {isDarkMode, colors} = useTheme();
  if (!visible || !error) {
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
      <Text style={[styles.error, {color: colors.alert}]}>{error}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {},
  error: {
    fontSize: Text_Size.Text_0,
    marginBottom: 10,
    marginTop: 5,
  },
});
