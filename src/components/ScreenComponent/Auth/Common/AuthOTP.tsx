/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import Colors from '../../../../constants/Colors';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';
import Text_Size from '../../../../constants/textScaling';
interface Props {
  name: string;
  auth?: boolean;
}
const AuthOTP = ({name, auth}: Props) => {
  const {errors, onBlur, onChange} = useRHFContext(name);
  return (
    <View style={styles.container}>
      <OtpInputs
        handleChange={onChange}
        numberOfInputs={6}
        clearTextOnFocus
        keyboardType='phone-pad'
        autofillFromClipboard={true}
        onBlur={onBlur}
        placeholder={'-'}
        style={[
          styles.inputContainer,
          {backgroundColor: 'white'},
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
    width: 48,
    height: 48,
    fontSize: Text_Size.Text_0,
    textAlign: 'center',
    color: 'black',
    marginRight: 5,
  },
});
export default AuthOTP;
