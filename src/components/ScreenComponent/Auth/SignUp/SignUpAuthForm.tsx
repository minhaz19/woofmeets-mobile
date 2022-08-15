/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import AppFormField from '../../../common/Form/AppFormField';
import AppSwitch from '../../../common/AppSwitch';
import SubmitButton from '../../../common/Form/SubmitButton';

interface Props {
  handleSubmit: (value: any) => void;

  btnTitle: string;
  setNewPassword?: boolean;
  forgotPassword?: boolean;
  forgotPasswordOpt?: boolean;
  verifyAccount?: boolean;
  termsAndCond?: boolean;
  btn2Title?: string;
  onPress?: () => void;
}
const signUpData = [
  {
    label: 'First Name',
    keyboardType: 'default',
    placeholder: 'Enter your first name',
    textContentType: 'name',
    name: 'firstName',
  },
  {
    label: 'Last Name',
    keyboardType: 'default',
    placeholder: 'Enter your last name',
    textContentType: 'name',
    name: 'lastName',
  },
  {
    label: 'Email Address',
    keyboardType: 'email-address',
    placeholder: 'Enter your email',
    textContentType: 'emailAddress',
    name: 'email',
  },
  {
    label: 'Password',
    keyboardType: 'default',
    placeholder: 'Enter your password',
    textContentType: 'password',
    name: 'password',
  },
  {
    label: 'Zip Code',
    keyboardType: 'numeric',
    placeholder: 'Enter your zip code',
    textContentType: 'postalCode',
    name: 'zipCode',
  },
];
const SignUpAuthForm = ({
  handleSubmit,
  btnTitle,
  setNewPassword,
  termsAndCond,
}: Props) => {
  const methods = useFormContext();
  return (
    <View style={styles.container}>
      <>
        {signUpData.map(item => (
          <View key={item.label}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon={item.name === 'password' ? 'lock' : ''}
              keyboardType={item.keyboardType}
              placeholder={item.placeholder}
              textContentType={item.textContentType}
              name={item.name}
              label={item.label}
              secureTextEntry={item.name === 'password' ? true : false}
              methods={methods}
            />
          </View>
        ))}

        {termsAndCond && (
          <View style={styles.switchContainer}>
            <AppSwitch name="terms" terms auth />
          </View>
        )}
        <View style={{marginTop: setNewPassword ? 20 : 10}}>
          <SubmitButton title={btnTitle} onPress={handleSubmit} />
        </View>
      </>
    </View>
  );
};

export default SignUpAuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  otpContainer: {
    marginTop: 20,
  },
  resendBtn: {
    marginTop: 30,
  },
  switchContainer: {
    marginVertical: 20,
  },
});

//  <AppFormField
//    autoCapitalize="none"
//    autoCorrect={false}
//    icon={'lock'}
//    secureTextEntry
//    placeholder={setNewPassword ? 'Enter new password' : 'Enter your password'}
//    methods={methods}
//    name={setNewPassword ? 'newPass' : 'password'}
//    label={setNewPassword ? 'New Password' : 'Password'}
//    forgotPassword={setNewPassword || termsAndCond ? false : true}
//    textContentType={setNewPassword ? 'newPassword' : 'password'}
//    auth
//  />;
