/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import AppButton from '../../../common/AppButton';
import SubmitButton from '../../../common/Form/SubmitButton';
import AuthOTP from './AuthOTP';
import ResendCode from '../VerifyAccount/ResendCode';
import AppSwitch from '../../../common/AppSwitch';
import {useFormContext} from 'react-hook-form';

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
const AuthForm = ({
  handleSubmit,
  btnTitle,
  setNewPassword,
  forgotPassword,
  forgotPasswordOpt,
  btn2Title,
  verifyAccount,
  termsAndCond,
  onPress,
}: Props) => {
  const methods = useFormContext();
  return (
    <View style={styles.container}>
      <>
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
                email={setNewPassword ? false : true}
                methods={methods}
                auth
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
                methods={methods}
                name={setNewPassword ? 'newPass' : 'password'}
                label={setNewPassword ? 'New Password' : 'Password'}
                forgotPassword={setNewPassword || termsAndCond ? false : true}
                textContentType={setNewPassword ? 'newPassword' : 'password'}
                auth
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
            methods={methods}
            placeholder="Confirm your password"
            textContentType="password"
            name="confirmPass"
            label="Confirm Password"
            auth
          />
        )}
        {(forgotPasswordOpt || verifyAccount) && (
          <View style={styles.otpContainer}>
            <AuthOTP name="code" auth />
          </View>
        )}
        {verifyAccount && (
          <View style={styles.resendBtn}>
            <ResendCode />
          </View>
        )}
        {termsAndCond && (
          <View style={styles.switchContainer}>
            <AppSwitch name="terms" terms auth />
          </View>
        )}
        <View style={{marginTop: setNewPassword ? 20 : 10}}>
          <SubmitButton title={btnTitle} onPress={handleSubmit} />
          {(setNewPassword || forgotPassword || forgotPasswordOpt) && (
            <AppButton
              title={btn2Title ? btn2Title : 'Cancel'}
              onPress={onPress}
            />
          )}
        </View>
      </>
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
