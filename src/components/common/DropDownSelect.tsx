/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SelectList} from 'react-native-dropdown-select-list';
import Colors from '../../constants/Colors';

interface Props {
  value: any;
  data: any;
  placeholder: string;
}

const DropDownSelect = ({value, data, placeholder}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const [selectedItem, setSelectedItem] = useState(value);
  // const handleState = () => {
  //   setValue(name, selectedItem);
  // };
//   useEffect(() => {
//     setSelectedItem(value);
//   }, [value]);
  return (
    <View>
      <SelectList
        setSelected={setSelectedItem}
        // onSelect={handleState}
        data={data}
        boxStyles={{
          borderRadius: 0,
          backgroundColor: isDarkMode
            ? colors.lightBackgroundColor
            : colors.backgroundColor,
          borderColor: isDarkMode ? Colors.gray : Colors.border,
        }}
        placeholder={placeholder}
        arrowicon={
          <FontAwesome
            name="chevron-down"
            size={12}
            color={colors.descriptionText}
          />
        }
        searchicon={
          <FontAwesome name="search" size={12} color={colors.descriptionText} />
        }
        defaultOption={{key: value, value: value}}
      />
    </View>
  );
};

export default DropDownSelect;

const styles = StyleSheet.create({});
