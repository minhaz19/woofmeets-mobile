/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';
interface Props {
  name: string;
  auth?: boolean;
}
const AuthOTP = ({name, auth}: Props) => {
  const {isDarkMode} = useTheme();
  const {errors, onBlur, onChange} = useRHFContext(name);
  return (
    <View style={styles.container}>
      <OtpInputs
        // handleChange={code => setValue(name, code)}
        handleChange={onChange}
        numberOfInputs={4}
        autofillFromClipboard={false}
        onBlur={onBlur}
        placeholder={'-'}
        style={[
          styles.inputContainer,
          {backgroundColor: isDarkMode ? Colors.dark.lightDark : 'white'},
        ]}
        inputStyles={[styles.input]}
      />
      <View>
        <ErrorMessage error={errors[name]?.message} auth={auth} />
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
