import {View} from 'react-native';
import React from 'react';
import AppCheckbox from './AppCheckbox';
import {FormikValues, useFormikContext} from 'formik';
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
  const {setFieldValue} = useFormikContext<FormikValues>();
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
        // onBlur={() => setFieldTouched(addPetInputs[0].name!)}
        onPress={() => {
          handleValues();
          // @ts-ignore
          onPress();
        }}
      />
    </View>
  );
};

export default AppCheckboxField;
