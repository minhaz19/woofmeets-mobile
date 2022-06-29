import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import AppForm from '../../common/Form/AppForm';
import AppFormField from '../../common/Form/AppFormField';
import * as Yup from 'yup';
import SubmitButton from '../../common/Form/SubmitButton';
import ButtonCom from '../../UI/ButtonCom';
import { btnStyles } from '../../../constants/buttonStyles';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});
interface IntialValue {
  email: string;
  password: string;
}
const initialValues: IntialValue = {email: '', password: ''};
const LoginInput = () => {
  const handleSubmit = (value: {}) => {
    Alert.alert(JSON.stringify(value));
  };
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
          placeholder="Enter your email"
          textContentType="emailAddress"
          name="email"
          label="Email/Phone Number"
        />

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon={'lock'}
          secureTextEntry
          placeholder="Enter your password"
          textContentType="password"
          name="password"
          label="Password"
        />
        <ButtonCom
          title={'LOG IN'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={undefined}
        />
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
