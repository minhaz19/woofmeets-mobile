import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppForm from '../../common/Form/AppForm';
import AppFormField from '../../common/Form/AppFormField';
import * as Yup from 'yup';
import SubmitButton from '../../common/Form/SubmitButton';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});
const LoginInput = () => {
  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon={'email'}
          keyboardType={'email-address'}
          placeholder="Email"
          textContentType="emailAddress"
          name="email"
          label="Email/Phone Number"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon={'lock'}
          secureTextEntry
          placeholder="Password"
          textContentType="password"
          name="password"
          label="Password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  container: {
    // flex: ,
    marginTop: '5%',
  },
});
