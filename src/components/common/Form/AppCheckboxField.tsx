/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppCheckbox from './AppCheckbox';
import ErrorMessage from './ErrorMessage';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';
import {Controller} from 'react-hook-form';
interface Props {
  title: string;
  typeKey: number;
  active: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress: () => void;
  methods?: any;
}
const AppCheckboxField = ({
  title,
  typeKey,
  active,
  square,
  name,
  radio,
  onPress,
  methods,
}: Props) => {
  const {
    setValue,
    control,
    formState: {errors},
  } = methods;
  console.log('getting methods form checkobx');
  // const {value, onBlur, onChange} = useRHFContext(name, control);
  const handleValues = () => {
    setValue(name, typeKey, {shouldValidate: true});
    onPress();
  };
  return (
    <View style={styles.container}>
      <View style={{marginBottom: errors[name] ? 25 : 0}}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppCheckbox
              title={title}
              key={typeKey}
              square={square}
              radio={radio}
              active={active}
              onPress={handleValues}
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
const areEqual = (prevProps: any, nextProps: any) => {
  return (
    prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty
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
