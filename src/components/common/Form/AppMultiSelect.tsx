/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import {MultiSelect} from 'react-native-element-dropdown';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {Cross, Minus, Plus} from '../../../assets/svgs/SVG_LOGOS';
import TitleText from '../text/TitleText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

interface Props {
  data: [label: string, value: string] | [];
  onChange: (arg0: any) => void;
  placeholder: string;
  value?: [];
}
const AppMultiSelect = ({data, onChange, placeholder, value}: Props) => {
  const [selected, setSelected] = useState(value);
  const {isDarkMode, colors} = useTheme();
  const renderItem = useCallback((item: any, index) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {index === true ? (
          <Minus fill={Colors.primary} width={20} height={20} />
        ) : (
          <Plus fill={Colors.primary} width={20} height={20} />
        )}
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: isDarkMode ? Colors.gray : Colors.border,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data ? data : [{label: 'Item 1', value: '1'}]}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        search
        searchPlaceholder="Search..."
        containerStyle={{
          backgroundColor: colors.backgroundColor,
          borderWidth: 1,
        }}
        onChange={item => {
          setSelected(item);
          onChange(item);
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        renderSelectedItem={useCallback((item, unSelect) => {
          return (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <TitleText
                  textStyle={styles.textSelectedStyle}
                  text={item?.label}
                />
                <Cross fill="white" />
              </View>
            </TouchableOpacity>
          );
        }, [])}
      />
    </View>
  );
};

export default memo(AppMultiSelect);

const styles = StyleSheet.create({
  container: {paddingVertical: 16},
  dropdown: {
    padding: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
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
