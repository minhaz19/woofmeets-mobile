/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ErrorMessage from './ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import AppInput from './AppInput';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
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
  numberOfLines?: number;
  multiline?: boolean;
  flex?: number;
  subTitle?: string;
  email?: boolean;
  textInputStyle?: ViewStyle;
  auth?: boolean;
}
type StackParamList = {
  ForgotPassword: {foo: string; onBar: () => void} | undefined;
};
// width: flex ? '48%' : '100%';
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
  numberOfLines,
  multiline,
  flex,
  subTitle,
  email,
  textInputStyle,
  auth,
}: Props) => {
  const {setFieldTouched, touched, errors, values, setFieldValue} =
    useFormikContext<FormikValues>();
  const navigation = useNavigation<NavigationProps>();
  return (
    <>
      <View style={{width: flex ? '48%' : '100%'}}>
        <TitleText textStyle={styles.label} text={label} />
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}

        <AppInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          icon={icon}
          keyboardType={keyboardType}
          placeholder={placeholder}
          textContentType={textContentType}
          onChangeText={(text: string) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          secureTextEntry={secureTextEntry}
          error={errors[name]}
          touch={touched[name]}
          numberOfLines={numberOfLines && numberOfLines}
          multiline={multiline ? true : false}
          flex={flex}
          email={email}
          textInputStyle={textInputStyle}
        />

        <ErrorMessage
          error={errors[name]}
          visible={touched[name]}
          auth={auth}
        />
      </View>
      {forgotPassword && (
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <TitleText
            textStyle={styles.forgotPassword}
            text="Forgot Password ?"
          />
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
    marginBottom: 10,
  },
  subTitle: {
    fontSize: Text_Size.Text_0,
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: Text_Size.Text_0,
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 5,
    fontWeight: '500',
  },
});
