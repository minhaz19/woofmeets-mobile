import React from 'react';
import ErrorMessage from './ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import AppInput from './AppInput';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
type StackParamList = {
  ForgotPassword: {foo: string; onBar: () => void} | undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>;
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
  const {setFieldTouched, touched, errors, values, setFieldValue} =
    useFormikContext<FormikValues>();
  const navigation = useNavigation<NavigationProps>();
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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
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
