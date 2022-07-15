/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from '../../../common/Form/ErrorMessage';
interface Props {
  name: string;
  auth?: boolean;
}
const AuthOTP = ({name, auth}: Props) => {
  const {isDarkMode} = useTheme();
  const {setFieldTouched, touched, errors, setFieldValue} =
    useFormikContext<FormikValues>();
  return (
    <View style={styles.container}>
      <OtpInputs
        handleChange={code => setFieldValue(name, code)}
        numberOfInputs={4}
        autofillFromClipboard={false}
        onBlur={() => setFieldTouched(name)}
        placeholder={'-'}
        style={[
          styles.inputContainer,
          {backgroundColor: isDarkMode ? Colors.dark.lightDark : 'white'},
        ]}
        inputStyles={[styles.input]}
      />
      <View>
        <ErrorMessage
          error={errors[name]}
          visible={touched[name]}
          auth={auth}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.light.borderColor,
    backgroundColor: 'white',
    width: 50,
    height: 40,
    textAlign: 'center',
    color: 'black',
  },
});
export default AuthOTP;
