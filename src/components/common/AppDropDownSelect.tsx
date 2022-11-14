/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import TitleText from './text/TitleText';
import Text_Size from '../../constants/textScaling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import ErrorMessage from './Form/ErrorMessage';
import Colors from '../../constants/Colors';

interface Props {
  title: string;
  setValue: any;
  name: string;
  data: any;
  valueData?: any;
  placeholder: string;
  errors: any;
}

const AppDropDownSelect = ({
  title,
  setValue,
  name,
  data,
  valueData,
  placeholder,
  errors,
}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const [selectedItem, setSelectedItem] = useState(valueData);
  const handleState = () => {
    setValue(name, selectedItem);
  };
  return (
    <View style={styles.container}>
      <TitleText text={title} textStyle={styles.label} />
      <SelectList
        setSelected={setSelectedItem}
        onSelect={handleState}
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
        defaultOption={{key: valueData, value: valueData}}
      />
      <ErrorMessage error={errors[name]?.message} />
    </View>
  );
};

export default AppDropDownSelect;

const styles = StyleSheet.create({
  container: {marginBottom: 10},
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
});
