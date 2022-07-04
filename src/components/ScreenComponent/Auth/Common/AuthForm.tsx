/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import AppButton from '../../../common/AppButton';
import SubmitButton from '../../../common/Form/SubmitButton';
import AuthOTP from './AuthOTP';
import ResendCode from '../VerifyAccount/ResendCode';
import AppSwitch from '../../../common/AppSwitch';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  btnTitle: string;
  setNewPassword?: boolean;
  forgotPassword?: boolean;
  forgotPasswordOpt?: boolean;
  verifyAccount?: boolean;
  termsAndCond?: boolean;
  btn2Title?: string;
  onPress?: () => void;
}
const AuthForm = ({
  handleSubmit,
  initialValues,
  validationSchema,
  btnTitle,
  setNewPassword,
  forgotPassword,
  forgotPasswordOpt,
  btn2Title,
  verifyAccount,
  termsAndCond,
  onPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {!forgotPasswordOpt && !verifyAccount && (
          <>
            <View>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon={'email'}
                keyboardType={'email-address'}
                placeholder={
                  setNewPassword ? 'Enter old password' : 'Enter your email'
                }
                textContentType={setNewPassword ? 'password' : 'emailAddress'}
                name={setNewPassword ? 'oldPass' : 'email'}
                label={setNewPassword ? 'Old Password' : 'Email/Phone Number'}
                secureTextEntry={setNewPassword ? true : false}
              />
            </View>

            {!forgotPassword && (
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon={'lock'}
                secureTextEntry
                placeholder={
                  setNewPassword ? 'Enter new password' : 'Enter your password'
                }
                name={setNewPassword ? 'newPass' : 'password'}
                label={setNewPassword ? 'New Password' : 'Password'}
                forgotPassword={setNewPassword || termsAndCond ? false : true}
                textContentType={setNewPassword ? 'newPassword' : 'password'}
              />
            )}
          </>
        )}
        {setNewPassword && (
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={'lock'}
            secureTextEntry
            placeholder="Confirm your password"
            textContentType="password"
            name="confirmPass"
            label="Confirm Password"
          />
        )}
        {(forgotPasswordOpt || verifyAccount) && (
          <View style={styles.otpContainer}>
            <AuthOTP name="code" />
          </View>
        )}
        {verifyAccount && (
          <View style={styles.resendBtn}>
            <ResendCode />
          </View>
        )}
        <View style={styles.switchContainer}>
          {termsAndCond && <AppSwitch name="terms" terms />}
        </View>
        <View style={{marginTop: setNewPassword ? 20 : 0}}>
          <SubmitButton title={btnTitle} />
          {(setNewPassword || forgotPassword || forgotPasswordOpt) && (
            <AppButton
              title={btn2Title ? btn2Title : 'Cancel'}
              onPress={onPress}
            />
          )}
        </View>
      </AppForm>
    </View>
  );
};

export default AuthForm;

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
