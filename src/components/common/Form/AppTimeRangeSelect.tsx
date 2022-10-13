/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Colors from '../../../constants/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

interface Props {
  data: any[];
  placeholder: string;
  value: any;
  disable?: boolean;
  onChange?: (arg: any) => void;
  setTime?: any;
  time?: any;
}

const AppTimeRangeSelect = ({
  data,
  placeholder,
  value,
  disable = false,
  setTime,
  time,
}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = useCallback(
    (item: any) => {
      return (
        <View style={[styles.item, {backgroundColor: colors.backgroundColor}]}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
        </View>
      );
    },
    [colors.backgroundColor],
  );
  return (
    <View>
      <Dropdown
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
        containerStyle={{
          backgroundColor: colors.backgroundColor,
          borderWidth: 1,
        }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        disable={disable}
        renderItem={renderItem}
        // onChange={(item) => setTime({ ...time, startTime: item.value })}
        onChange={item => {
          placeholder === 'From'
            ? setTime({...time, startTime: item.label})
            : setTime({...time, endTime: item.label});
          setIsFocus(false);
        }}
        // onChange={onChange}
      />
    </View>
  );
};

export default AppTimeRangeSelect;

const styles = StyleSheet.create({
  container: {paddingVertical: 16},
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  dropdown: {
    padding: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_10 : Text_Size.Text_12,
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
    // backgroundColor: 'red',
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
