import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {FormikErrors, FormikTouched} from 'formik';
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
  const {colors} = useTheme();
  if (!visible || !error) {
    return null;
  }
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
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
