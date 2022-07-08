/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ErrorMessage from './ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import AppInput from './AppInput';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
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
  numberOfLines,
  multiline,
  flex,
  subTitle,
  email,
  textInputStyle,
}: Props) => {
  const {setFieldTouched, touched, errors, values, setFieldValue} =
    useFormikContext<FormikValues>();
  const navigation = useNavigation<NavigationProps>();
  const {colors} = useTheme();
  return (
    <>
      <View style={{width: flex ? '48%' : '100%'}}>
        <Text style={[styles.label, {color: colors.headerText}]}>{label}</Text>
        <Text style={[styles.subTitle, {color: colors.headerText}]}>
          {subTitle}
        </Text>
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
          error={errors[name]}
          touch={touched[name]}
          numberOfLines={numberOfLines ? numberOfLines : 0}
          multiline={multiline ? true : false}
          flex={flex}
          email={email}
          textInputStyle={textInputStyle}
        />

        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
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
  subTitle: {
    fontSize: Text_Size.Text_0,
  },
  forgotPassword: {
    fontSize: Text_Size.Text_0,
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 5,
    fontWeight: '500',
  },
});
