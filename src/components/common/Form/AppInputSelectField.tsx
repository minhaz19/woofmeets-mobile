/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ErrorMessage from './ErrorMessage';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import TitleText from '../text/TitleText';
import DescriptionText from '../text/DescriptionText';
import AppInputSelect from './AppInputSelect';
import {setCross} from '../../../store/slices/misc/hittingCross';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';
import { useAppDispatch } from '../../../store/store';
interface Props {
  name: string;
  label: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;

  placeholder?: string;

  subTitle?: string;
  Icon?: any;
  textInputStyle?: ViewStyle;
  onPress?: () => void;
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
  onPress,
}: Props) => {
  const {errors, value, onBlur} = useRHFContext(name);
  const dispatch = useAppDispatch();
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
          onBlur={onBlur}
          value={value}
          textInputStyle={textInputStyle}
          Icon={Icon}
          onPress={onPress}
          onPressCross={() => {
            dispatch(setCross(true));
          }}
        />

        <ErrorMessage error={errors[name]?.message} />
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
