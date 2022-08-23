/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';
import {genders} from '../../../utils/config/Data/AddPetData';
import {useController, useFormContext} from 'react-hook-form';
interface Props {
  name: string;
  label: string;
  data?: [];
  methods?: any;
}
const AppSelect = ({label, name}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  const {
    field: {onBlur, onChange, value},
  } = useController({name, control});
  return (
    <View>
      <Text style={[styles.label, {color: colors.headerText}]}>{label}</Text>
      <SelectDropdown
        buttonStyle={{
          height: 40,
          width: '100%',
          backgroundColor: colors.backgroundColor,
          marginVertical: 10,
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: isDarkMode ? Colors.gray : Colors.border,
          borderRadius: 2,
          flexDirection: 'row',
          paddingHorizontal: 5,
          marginBottom: 10,
        }}
        selectedRowTextStyle={styles.text}
        buttonTextStyle={styles.buttonText}
        data={genders}
        onSelect={selectedItem =>
          setValue('gender', selectedItem, {shouldValidate: true})
        }
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
      />
      <ErrorMessage error={errors[name]?.message} />
    </View>
  );
};

export default AppSelect;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonText: {fontSize: Text_Size.Text_1, color: 'gray'},
  text: {
    flex: 0,
    color: 'black',
  },
});
