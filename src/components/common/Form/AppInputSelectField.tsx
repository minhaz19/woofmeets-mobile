/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ErrorMessage from './ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
import AppInputSelect from './AppInputSelect';
interface Props {
  name: string;
  label: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;

  placeholder?: string;

  subTitle?: string;
  Icon?: any;
  textInputStyle?: ViewStyle;
}

const AppInputSelectField = ({
  name,
  autoCapitalize,
  autoCorrect,
  placeholder,
  label,
  subTitle,
  textInputStyle,
  Icon,
}: Props) => {
  const {setFieldTouched, touched, errors, setFieldValue} =
    useFormikContext<FormikValues>();

  return (
    <>
      <View style={{width: '100%'}}>
        <TitleText textStyle={styles.label} text={label} />
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}

        <AppInputSelect
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          onChangeText={(text: string) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          // value={values[name]}
          textInputStyle={textInputStyle}
          Icon={Icon}
        />

        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
};

export default AppInputSelectField;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_0,
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
