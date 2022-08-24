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
  loading?: boolean;
  forgotPasswordReset?: boolean;
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
  forgotPasswordReset,
  loading,
}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <View style={styles.container}>
      <>
        {!forgotPasswordOpt && !verifyAccount && (
          <>
            {!forgotPasswordReset && (
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
                  errors={errors}
                  control={control}
                  auth
                />
              </View>
            )}

            {!forgotPassword && (
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon={'lock'}
                secureTextEntry
                placeholder={
                  setNewPassword || forgotPasswordReset
                    ? 'Enter new password'
                    : 'Enter your password'
                }
                errors={errors}
                control={control}
                name={setNewPassword ? 'newPass' : 'password'}
                label={
                  setNewPassword || forgotPasswordReset
                    ? 'New Password'
                    : 'Password'
                }
                forgotPassword={
                  setNewPassword || termsAndCond || forgotPasswordReset
                    ? false
                    : true
                }
                textContentType={
                  setNewPassword || forgotPasswordReset
                    ? 'newPassword'
                    : 'password'
                }
                auth
              />
            )}
          </>
        )}
        {(setNewPassword || forgotPasswordReset) && (
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={'lock'}
            secureTextEntry
            errors={errors}
            control={control}
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
        <View
          style={{
            marginTop: setNewPassword ? 20 : forgotPasswordReset ? 30 : 10,
          }}>
          <SubmitButton
            title={btnTitle}
            onPress={handleSubmit}
            loading={loading}
          />
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
