import React, {memo} from 'react';
import ErrorMessage from './ErrorMessage';
import AppInput from './AppInput';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
import {Controller} from 'react-hook-form';
import Colors from '../../../constants/Colors';
import { useTheme } from '../../../constants/theme/hooks/useTheme';
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
  errors: any;
  control: any;
  defaultValue?: string;
  onPressIn?: () => void;
  onPressOut?: () => void;
  editable?: boolean;
}
type StackParamList = {
  ForgotPasswordEmail: {foo: string; onBar: () => void} | undefined;
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
  auth,
  errors,
  control,
  defaultValue,
  onPressIn,
  onPressOut,
  editable = true,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {isDarkMode} = useTheme()
  return (
    <>
      <View>
        <TitleText textStyle={styles.label} text={label} />
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <AppInput
                  autoCapitalize={autoCapitalize}
                  autoCorrect={autoCorrect}
                  icon={icon}
                  keyboardType={keyboardType}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  name={name}
                  textContentType={textContentType}
                  onChangeText={onChange}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  editable={editable}
                  onBlur={onBlur}
                  value={name == 'dob' ? value.replace(/^([\d]{2})([\d]{2})([\d]{4})$/,"$1/$2/$3") : value?.toString()}
                  secureTextEntry={secureTextEntry}
                  error={errors[name]}
                  numberOfLines={numberOfLines && numberOfLines}
                  multiline={multiline ? true : false}
                  flex={flex}
                  email={email}
                  textInputStyle={textInputStyle}
                />
                {error?.message && (
                  <ErrorMessage error={error?.message} auth={auth} />
                )}
              </>
            );
          }}
          name={name}
        />
      </View>
      {forgotPassword && (
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordEmail')}>
          <TitleText
            textStyle={{...styles.forgotPassword, color: isDarkMode ? Colors.primary : Colors.blue}}
            text="Forgot Password ?"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default memo(AppFormField);
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
