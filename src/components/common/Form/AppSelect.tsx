/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ErrorMessage from './ErrorMessage';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';
interface Props {
  name: string;
  label: string;
  data: any[];
  disable?: boolean;
}
const AppSelect = ({label, name, data, disable = true}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const {setValue, errors} = useRHFContext(name);
  return (
    <View>
      <Text style={[styles.label, {color: colors.headerText}]}>{label}</Text>
      <SelectDropdown
        buttonStyle={{
          height: 40,
          width: '100%',
          backgroundColor: disable
            ? Colors.light.borderColor
            : colors.backgroundColor,
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
        data={data}
        defaultButtonText="USA"
        disabled={disable}
        onSelect={selectedItem => {
          setValue(name, selectedItem.id);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem.value;
        }}
        rowTextForSelection={item => {
          return item.value;
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
