import {View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import AppCheckbox from '../../../../common/Form/AppCheckbox';
interface Props {
  title: string;
  typeKey: any;
  active?: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress?: () => void;
  activePetHosting?: any;
  control: any;
  setValue?: (name: string, value: any, shouldValidate?: boolean) => void;
  handleValues?: () => void;
  handleActiveMultipleCheck?: (arg1: number, arg2: any) => void;
}
const ServiceCheckbox = ({
  title,
  typeKey,
  square,
  name,
  active,
  radio,
  onPress,
  control,
}: Props) => {
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onBlur, value}}) => {
          return (
            <AppCheckbox
              title={title}
              key={typeKey}
              square={square}
              radio={radio}
              active={active ? true : typeKey === value ? true : false}
              onPress={onPress}
              onBlur={onBlur}
              // inputRef={ref}
            />
          );
        }}
        name={name}
      />
    </View>
  );
};

export default ServiceCheckbox;
