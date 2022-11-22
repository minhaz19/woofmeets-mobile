import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text_Size from '../../../constants/textScaling';
import {Controller} from 'react-hook-form';
import AppSelect from './AppSelect';
import TitleText from '../text/TitleText';
import ErrorMessage from './ErrorMessage';
import BasicInfoSelect from '../../ScreenComponent/setting/Components/basicInfoSelect';

interface Props {
  name: string;
  control: any;
  label?: string;
  data: any;
  placeholder: any;
  disable?: boolean;
  defaultText?: string;
  setSelectedService?: (arg: any) => void;
  country?: boolean;
}
const AppSelectField = ({
  name,
  control,
  label,
  data,
  placeholder,
  disable,
  defaultText,
  setSelectedService,
  country = false,
}: Props) => {
  return (
    <View>
      {label && <TitleText textStyle={styles.label} text={label} />}
      <Controller
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <>
              {country ? (
                <BasicInfoSelect
                  placeholder={placeholder}
                  name={name}
                  data={data}
                  defaultText={
                    value !== '' && value !== undefined ? value : defaultText
                  }
                  disable={disable}
                  onChange={onChange}
                  setSelectedService={setSelectedService}
                />
              ) : (
                <AppSelect
                  placeholder={placeholder}
                  name={name}
                  data={data}
                  defaultText={
                    value !== '' && value !== undefined ? value : defaultText
                  }
                  disable={disable}
                  onChange={onChange}
                  setSelectedService={setSelectedService}
                />
              )}

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
