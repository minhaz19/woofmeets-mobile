import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {FormikErrors, FormikTouched} from 'formik';
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
  console.log('type', typeof visible);
  if (!visible || !error) {
    return null;
  }
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: Text_Size.Text_0,
    marginBottom: 10,
  },
});
