import {FormikValues, useFormikContext} from 'formik';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../../../constants/textScaling';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import BoardingInput from './BoardingInput';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import {InfoSvg} from '../../Inbox/utils/SvgComponent/SvgComponent';
import Colors from '../../../../constants/Colors';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';

interface Props {
  name: string;
  label: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  icon?: boolean;
  keyboardType?: string;
  placeholder?: string;
  textContentType?: string;
  forgotPassword?: boolean;
  subTitle?: string;
  email?: boolean;
  textInputStyle?: ViewStyle;
  auth?: boolean;
  linkText?: string;
  shortText?: string;
  checkbox?: string;
  additionalRates?: string;
  handlePress?: () => void;
  showAdditionalRates?: boolean;
}

const BoardingForm = ({
  name,
  autoCapitalize,
  autoCorrect,
  icon,
  keyboardType,
  placeholder,
  textContentType,
  label,
  subTitle,
  textInputStyle,
  auth,
  linkText,
  shortText,
  checkbox,
  additionalRates,
  handlePress,
  showAdditionalRates,
}: Props) => {
  const [updateRates, setUpdateRates] = useState(true);
  const {setFieldTouched, touched, errors, values, setFieldValue} =
    useFormikContext<FormikValues>();
  return (
    <>
      <View>
        <View style={styles.titleContainer}>
          <TitleText textStyle={styles.label} text={label} />

          {icon && <InfoSvg width={16} height={16} style={styles.svg} />}
        </View>

        {subTitle && showAdditionalRates && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}

        <BoardingInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          icon={icon}
          keyboardType={keyboardType}
          // placeholder={placeholder}
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
        {checkbox && (
          <AppCheckboxField
            title={checkbox}
            radio
            typeKey={99}
            active={updateRates}
            onPress={() => {
              setUpdateRates(!updateRates);
              // setFieldValue('updateRates', updateRates);
            }}
            name={'updateRates'}
          />
        )}
        {linkText && (
          <TouchableOpacity>
            <DescriptionText textStyle={styles.linkText} text={linkText} />
          </TouchableOpacity>
        )}
        {shortText && (
          <DescriptionText textStyle={styles.shortText} text={shortText} />
        )}
        {additionalRates && showAdditionalRates && (
          <TouchableOpacity onPress={handlePress}>
            <DescriptionText
              text={additionalRates}
              textStyle={{color: Colors.primary}}
            />
          </TouchableOpacity>
        )}
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
  linkText: {
    color: Colors.light.blue,
    marginVertical: '2%',
  },
  shortText: {
    color: Colors.gray,
    marginVertical: '2%',
  },
});
