/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Colors from '../../../constants/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {setIsService} from '../../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import TitleText from '../text/TitleText';
interface Props {
  name: string;
  data: any[];
  disable?: boolean;
  defaultText?: string;
  placeholder: string;
  onChange: (arg: any) => void;
  setSelectedService?: (arg: any) => void;
}
const AppSelect = ({
  data,
  defaultText,
  placeholder,
  disable = false,
  onChange,
  setSelectedService,
}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const dispatch = useAppDispatch();
  const [value, setValuee] = useState(defaultText);
  const {isService} = useAppSelector((state: any) => state.providerFilter);
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = useCallback(
    (item: any) => {
      return (
        <View style={[styles.item, {backgroundColor: colors.backgroundColor}]}>
          <TitleText
            textStyle={{...styles.selectedTextStyle, color: colors.headerText}}
            text={item.label}
          />
        </View>
      );
    },
    [colors.backgroundColor],
  );
  useEffect(() => {
    setValuee(defaultText);
  }, [defaultText]);
  return (
    <View>
      <Dropdown
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: Colors.border,
          },
        ]}
        placeholderStyle={{
          ...styles.placeholderStyle,
          color: colors.descriptionText,
        }}
        selectedTextStyle={{
          ...styles.selectedTextStyle,
          color: colors.headerText,
        }}
        inputSearchStyle={{
          ...styles.inputSearchStyle,
          color: colors.headerText,
        }}
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
        value={isService.service !== '' ? isService?.service : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        disable={disable}
        renderItem={renderItem}
        onChange={item => {
          setValuee(item.value);
          setIsFocus(false);
          onChange(item.value);
          setSelectedService && setSelectedService(item.id);
          setIsService &&
            dispatch(setIsService({service: item.value, serviceId: item.id}));
        }}
      />
    </View>
  );
};

export default AppSelect;

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
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_11 : Text_Size.Text_12,
  },
  itemTextStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_11 : Text_Size.Text_12,
  },
  selectedTextStyle: {
    fontSize: Platform.OS === 'ios' ? Text_Size.Text_11 : Text_Size.Text_12,
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
});
