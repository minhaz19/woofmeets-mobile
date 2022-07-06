/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
interface Props {
  name?: string;
  label: string;
}
const AppSelect = ({label, name}: Props) => {
  const genders = ['Male', 'Female', 'Others'];
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        buttonStyle={styles.container}
        selectedRowTextStyle={styles.text}
        buttonTextStyle={styles.buttonText}
        data={genders}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
      />
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
  container: {
    height: 40,
    width: '100%',
    backgroundColor: '#f8f4f4',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    color: 'red',
  },
  text: {
    fontSize: Text_Size.Text_0,
    flex: 0,
    color: 'black',
  },
});
