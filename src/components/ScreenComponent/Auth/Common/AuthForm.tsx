/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppFormField from '../../../common/Form/AppFormField';
import AppButton from '../../../common/AppButton';
import SubmitButton from '../../../common/Form/SubmitButton';

interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  btnTitle: string;
  setNewPassword?: boolean;
}
const AuthForm = ({
  handleSubmit,
  initialValues,
  validationSchema,
  btnTitle,
  setNewPassword,
}: Props) => {
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
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
          forgotPassword={setNewPassword ? false : true}
          textContentType={setNewPassword ? 'newPassword' : 'password'}
        />
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
        <View style={{marginTop: setNewPassword ? 20 : 0}}>
          <SubmitButton title={btnTitle} />
          {setNewPassword && <AppButton title="Cancel" />}
        </View>
      </AppForm>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    // flex: ,
    marginTop: '5%',
  },
});
