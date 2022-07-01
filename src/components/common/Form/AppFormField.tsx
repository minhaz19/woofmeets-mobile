import React from 'react';
import ErrorMessage from './ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import AppInput from './AppInput';
import {StyleSheet, Text} from 'react-native';
import Text_Size from '../../../constants/textScaling';
interface Props {
  name: string;
  label: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  icon?: string;
  keyboardType?: string;
  placeholder?: string;
  textContentType?: string;
  secureTextEntry?: boolean;
  forgotPassword?: boolean;
}
const AppFormField = ({
  name,
  autoCapitalize,
  autoCorrect,
  icon,
  keyboardType,
  placeholder,
  textContentType,
  secureTextEntry,
  label,
  forgotPassword,
}: Props) => {
  const {
    setFieldTouched,

    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext<FormikValues>();

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <AppInput
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        icon={icon}
        keyboardType={keyboardType}
        placeholder={placeholder}
        textContentType={textContentType}
        onChangeText={(text: string) => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        //@ts-ignore
        value={values[name]}
        secureTextEntry={secureTextEntry}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {forgotPassword && (
        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
      )}
    </>
  );
};

export default AppFormField;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: Text_Size.Text_0,
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 5,
    fontWeight: '500',
  },
});
