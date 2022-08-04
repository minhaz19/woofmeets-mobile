/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppCheckbox from './AppCheckbox';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';
interface Props {
  onPress: () => void;
  title: string;
  typeKey: number;
  active: boolean;
  name: string;
  square?: boolean;
  radio?: boolean;
}
const AppCheckboxField = ({
  onPress,
  title,
  typeKey,
  active,
  square,
  name,
  radio,
}: Props) => {
  const {setFieldValue, errors, touched, setFieldTouched} =
    useFormikContext<FormikValues>();
  const handleValues = () => {
    setFieldValue(name, typeKey);
  };
  console.log('rending time', name);
  return (
    <View style={styles.container}>
      <View style={{marginBottom: errors[name] ? 25 : 0}}>
        <AppCheckbox
          title={title}
          key={typeKey}
          square={square}
          radio={radio}
          active={active}
          onBlur={() => setFieldTouched(name)}
          onPress={() => {
            handleValues();
            onPress();
          }}
        />
      </View>
      {typeKey === 1 && (
        <View style={styles.errorContainer}>
          <ErrorMessage error={errors[name]} visible={touched[name]} />
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
