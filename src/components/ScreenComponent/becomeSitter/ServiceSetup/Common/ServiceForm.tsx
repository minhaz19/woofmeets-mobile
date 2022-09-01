import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import TitleText from '../../../../common/text/TitleText';
import { InfoSvg } from '../../../Inbox/utils/SvgComponent/SvgComponent';
import DescriptionText from '../../../../common/text/DescriptionText';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';
import Colors from '../../../../../constants/Colors';
import ServiceInput from './ServiceInput';

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
  control: any;
  errors: any;
  setValue: (arg1: any, arg2: any, arg3: any) => void;
}

const ServiceForm = ({
  name,
  autoCapitalize,
  autoCorrect,
  icon,
  keyboardType,
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
  control,
  errors,
  setValue,
}: Props) => {
  const [updateRates, setUpdateRates] = useState(true);
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
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <ServiceInput
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
              icon={icon}
              keyboardType={keyboardType}
              // placeholder={placeholder}
              textContentType={textContentType}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors[name]?.message}
              textInputStyle={textInputStyle}
            />
          )}
          name={name}
        />
        <ErrorMessage error={errors[name]?.message} auth={auth} />
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
            errors={errors}
            control={control}
            setValue={setValue}
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

export default ServiceForm;

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
