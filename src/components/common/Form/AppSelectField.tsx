import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {Controller} from 'react-hook-form';
import AppSelect from './AppSelect';
import TitleText from '../text/TitleText';
import ErrorMessage from './ErrorMessage';

interface Props {
  name: string;
  control: any;
  label: string;
  data: any;
  placeholder: any;
  disable?: boolean;
  defaultText?: string;
}
const AppSelectField = ({
  name,
  control,
  label,
  data,
  placeholder,
  disable,
  defaultText,
}: Props) => {
  return (
    <View>
      <TitleText textStyle={styles.label} text={label} />
      <Controller
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <>
              <AppSelect
                placeholder={placeholder}
                name={name}
                data={data}
                defaultText={value !== '' ? value : defaultText}
                disable={disable}
                onChange={onChange}
              />
              <ErrorMessage error={error?.message} />
            </>
          );
        }}
        name={name}
      />
    </View>
  );
};

export default AppSelectField;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
});