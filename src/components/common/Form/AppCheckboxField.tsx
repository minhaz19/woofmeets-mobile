import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppCheckbox from './AppCheckbox';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';
interface Props {
  onPress?: (() => void | undefined) | undefined;
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
  return (
    <View>
      <AppCheckbox
        title={title}
        key={typeKey}
        square={square}
        radio={radio}
        active={active}
        onBlur={() => setFieldTouched(name)}
        onPress={() => {
          handleValues();
          // @ts-ignore
          onPress();
        }}
      />
      {typeKey === 1 && (
        <View style={styles.errorContainer}>
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </View>
      )}
    </View>
  );
};

export default AppCheckboxField;
const styles = StyleSheet.create({
  errorContainer: {marginTop: 10},
});
