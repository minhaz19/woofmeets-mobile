/* eslint-disable react-native/no-inline-styles */

import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React, {FC} from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import ErrorMessage from '../../../common/Form/ErrorMessage';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';

interface Props {
  label?: string;
  placeholder?: string;
  data: string[];
  name: string;
}

const BoardingDropdown: FC<Props> = ({label, placeholder, data, name}) => {
  const {colors} = useTheme();
  const {setValue, errors} = useRHFContext(name);
  return (
    <>
      {label && <HeaderText text={label} />}
      <SelectDropdown
        data={data}
        onSelect={selectedItem => setValue(name, selectedItem)}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        renderDropdownIcon={() => {
          return (
            <MaterialCommunityIcons
              name="chevron-right"
              size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
              style={styles.iconStyle}
              color={Colors.subText}
            />
          );
        }}
        dropdownIconPosition={'right'}
        // search={true}
        defaultButtonText={placeholder}
        buttonStyle={{
          borderWidth: 1,
          borderColor: Colors.border,
          width: '100%',
          height: 40,
          backgroundColor: colors.lightBackgroundColor,
          marginVertical: 10,
          borderRadius: 2,
        }}
        buttonTextStyle={{
          fontSize: Text_Size.Text_0,
          color: colors.headerText,
          textAlign: 'left',
        }}
        rowTextStyle={styles.rowTextStyle}
        selectedRowTextStyle={styles.text}
        dropdownStyle={styles.dropdownStyle}
        searchInputStyle={styles.searchInputStyle}
        searchPlaceHolder={'Search here'}
      />
      {name === 'advancedNotice' && (
        <ErrorMessage error={errors[name]?.message} />
      )}
    </>
  );
};

export default BoardingDropdown;

const styles = StyleSheet.create({
  iconStyle: {
    paddingRight: 0,
    transform: [{rotate: '90deg'}],
  },
  text: {
    color: Colors.primary,
  },
  dropdownStyle: {
    borderRadius: 10,
    marginTop: '2%',
    fontSize: Text_Size.Text_0,
  },
  searchInputStyle: {
    width: '100%',
    fontSize: Text_Size.Text_0,
    color: Colors.text,
    borderColor: Colors.border,
  },
  rowTextStyle: {
    fontSize: Text_Size.Text_0,
  },
});
