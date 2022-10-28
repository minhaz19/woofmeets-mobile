import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import TitleText from '../../../../common/text/TitleText';
import {InfoSvg} from '../../../Inbox/utils/SvgComponent/SvgComponent';
import DescriptionText from '../../../../common/text/DescriptionText';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import Text_Size from '../../../../../constants/textScaling';
import Colors from '../../../../../constants/Colors';
import ServiceInput from './ServiceInput';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import ServiceReusableModal from './ServiceReusableModal';

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
  checkPress?: () => void;
  editable?: boolean;
  showAdditionalRates?: boolean;
  control: any;
  errors: any;
  dValue?: any;
  setValue?: (arg1: any, arg2: any, arg3?: any) => void;
  percentage: number;
  baseRateWatch?: number;
  convertedValue?: number;
  onChange?: () => void;
  updateRates?: boolean;
  checked?: boolean;
  unit: string;
  helpText: string;
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
  percentage,
  additionalRates,
  handlePress,
  showAdditionalRates,
  editable,
  control,
  errors,
  baseRateWatch,
  convertedValue,
  setValue,
  updateRates,
  checked,
  unit,
  helpText,
}: Props) => {
  useEffect(() => {
    name !== 'baserate' &&
      updateRates === false &&
      checked === false &&
      setValue!(name, convertedValue?.toFixed(2), {
        shouldValidate: errors[name] ? true : false,
      });
  }, [name, updateRates, checked, setValue, convertedValue, errors]);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <View>
        <AppTouchableOpacity
          style={styles.titleContainer}
          onPress={() => setIsVisible(true)}>
          <TitleText textStyle={styles.label} text={label} />

          {icon && <InfoSvg width={16} height={16} style={styles.svg} />}
        </AppTouchableOpacity>

        {subTitle && showAdditionalRates && (
          <DescriptionText textStyle={styles.subTitle} text={subTitle} />
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <ServiceInput
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                icon={icon}
                editable={editable}
                keyboardType={keyboardType}
                textContentType={textContentType}
                onChangeText={onChange}
                onBlur={onBlur}
                value={
                  name === 'baserate' && value !== null
                    ? value?.toString()
                    : updateRates === false && baseRateWatch !== undefined
                    ? (Number(baseRateWatch!) * Number(percentage))
                        .toFixed(2)
                        .toString()
                    : value !== null && value?.toString()
                }
                error={error?.message}
                textInputStyle={textInputStyle}
                unit={unit}
              />
            );
          }}
          name={name}
        />
        <ErrorMessage error={errors[name]?.message} auth={auth} />
        {additionalRates && showAdditionalRates && (
          <TouchableOpacity onPress={handlePress}>
            <DescriptionText
              text={additionalRates}
              textStyle={{color: Colors.primary}}
            />
          </TouchableOpacity>
        )}
      </View>
      <ServiceReusableModal
        modalVisible={isVisible}
        setModalVisible={setIsVisible}
        question={'Help text for particular rates!'}
        description={helpText}
      />
    </>
  );
};

export default ServiceForm;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_0,
    fontWeight: 'bold',
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
  modcon: {
    padding: 30,
  },
  modTest: {textAlign: 'justify'},
});
