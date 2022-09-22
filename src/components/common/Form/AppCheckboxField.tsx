/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppCheckbox from './AppCheckbox';
import ErrorMessage from './ErrorMessage';
import {Controller} from 'react-hook-form';
interface Props {
  title: string;
  typeValue?: string | number | boolean;
  typeKey?: number | null;
  active?: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
  onPress: () => void;
  errors: any;
  control: any;
  small?: boolean;
}
const AppCheckboxField = ({
  title,
  typeValue,
  square,
  name,
  radio,
  onPress,
  control,
  errors,
  active,
  typeKey,
  small = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: errors[name]?.message ? 25 : 0}}>
        <Controller
          control={control}
          render={({field: {onBlur, value}}) => {
            // console.log('------------', name, active);
            return (
              <AppCheckbox
                title={title}
                square={square}
                radio={radio}
                active={
                  typeof active === 'boolean'
                    ? active
                    : typeValue === value
                    ? true
                    : false
                }
                // active={active}
                onPress={onPress}
                onBlur={onBlur}
                small={small}
              />
            );
          }}
          name={name}
        />
      </View>
      {errors !== false && typeKey === 1 && (
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
