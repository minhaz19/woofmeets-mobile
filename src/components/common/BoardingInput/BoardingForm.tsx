import {FormikValues, useFormikContext} from 'formik';
import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import ErrorMessage from '../Form/ErrorMessage';
import BoardingInput from './BoardingInput';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
import {InfoSvg} from '../../ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';

interface Props {
  name: string;
  label: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  icon?: boolean;
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

const BoardingForm = ({
  name,
  autoCapitalize,
  autoCorrect,
  icon,
  keyboardType,
  placeholder,
  textContentType,
  secureTextEntry,
  label,
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
  return (
    <>
      <View style={{width: '60%'}}>
        <View style={styles.titleContainer}>
          <TitleText textStyle={styles.label} text={label} />
          {icon && <InfoSvg width={16} height={16} style={styles.svg} />}
        </View>
        {subTitle && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}

        <BoardingInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          icon={icon}
          keyboardType={keyboardType}
          placeholder={placeholder}
          textContentType={textContentType}
          onChangeText={(text: string) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          value={values[name]}
          error={errors[name]}
          touch={touched[name]}
          textInputStyle={textInputStyle}
        />

        <ErrorMessage
          error={errors[name]}
          visible={touched[name]}
          auth={auth}
        />
      </View>
    </>
  );
};

export default BoardingForm;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  svg: {
    marginLeft: 10,
  },
});
