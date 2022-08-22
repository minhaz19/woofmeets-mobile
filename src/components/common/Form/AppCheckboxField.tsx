/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppCheckbox from './AppCheckbox';
import ErrorMessage from './ErrorMessage';
import {Controller} from 'react-hook-form';
interface Props {
  title: string;
  typeKey?: number | null;
  active: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress: () => void;
  errors?: any;
  control?: any;
  setValue?: (arg1: string, arg2: any, arg3: any) => void;
}
const AppCheckboxField = ({
  title,
  typeKey,
  active,
  square,
  name,
  radio,
  onPress,
  control,
  errors,
}: Props) => {
  // const {
  //   setValue,
  //   control,
  //   formState: {errors},
  // } = methods;
  // const handleValues = () => {
  //   setValue(name, typeKey, {shouldValidate: true});
  //   onPress();
  // };

  console.log('calling check field');
  return (
    <View style={styles.container}>
      <View style={{marginBottom: errors[name]?.message ? 25 : 0}}>
        <Controller
          control={control}
          render={({field: {onBlur}}) => (
            <AppCheckbox
              title={title}
              key={typeKey}
              square={square}
              radio={radio}
              active={active}
              onPress={onPress}
              onBlur={onBlur}
            />
          )}
          name={name}
        />
      </View>
      {typeKey === 1 && (
        <View style={styles.errorContainer}>
          <ErrorMessage error={errors[name]?.message} />
        </View>
      )}
    </View>
  );
};

export default memo(AppCheckboxField);
const styles = StyleSheet.create({
  container: {position: 'relative'},
  errorContainer: {
    marginVertical: 20,
    position: 'absolute',
    flex: 0,
    width: 200,
    left: 0,
    top: 15,
  },
});
