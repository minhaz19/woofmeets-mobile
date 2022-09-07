/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../text/HeaderText';
import AppSelectField from '../Form/AppSelectField';
import {contries} from '../../../utils/config/Data/AddPetData';
import {useForm} from 'react-hook-form';

interface Props {
  label: string;
  data: any[];
  name?: string;
  placeholder: string;
}

const Dropdown: FC<Props> = ({label, data, placeholder}) => {
  const {control} = useForm();
  return (
    <>
      <AppSelectField
        placeholder={placeholder}
        label={label}
        name={''}
        data={data}
        control={control}
      />
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {paddingVertical: 16},

  dropdown: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: Text_Size.Text_0,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: Text_Size.Text_0,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Text_Size.Text_0,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    marginTop: 10,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: Text_Size.Text_0,
    color: Colors.background,
  },
});
