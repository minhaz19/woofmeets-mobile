/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {FormikErrors, FormikTouched} from 'formik';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
interface Props {
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  visible: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}
const ErrorMessage = ({error, visible}: Props) => {
  if (!visible || !error) {
    return null;
  }
  const {isDarkMode} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.dark.lightDark : 'white'},
      ]}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {},
  error: {
    color: 'red',
    fontSize: Text_Size.Text_0,
    marginBottom: 10,
    marginTop: 10,
  },
});
