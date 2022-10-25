/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';
import {format} from 'date-fns';

interface Props {
  placeholder: string;
  value: any;
  setOpenCal: (arg0: any) => void;
}

const CalendarInput = ({placeholder, value, setOpenCal}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const isoDate = new Date(value).toISOString();
  const usaFormateData = format(new Date(isoDate), 'MM-dd-yyyy');
  return (
    <Pressable
      onPress={setOpenCal}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? colors.lightBackgroundColor
            : colors.backgroundColor,
          borderColor: isDarkMode ? Colors.gray : Colors.border,
        },
      ]}>
      <View pointerEvents="none">
        <TextInput
          placeholderTextColor={Colors.gray}
          placeholder={placeholder}
          style={[
            styles.text,
            {
              alignSelf: 'flex-start',
              height: 40,
              flex: 1,
              color: isDarkMode ? Colors.gray : Colors.black,
            },
          ]}
          value={value !== null ? usaFormateData : undefined}
        />
      </View>
    </Pressable>
  );
};

export default CalendarInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    fontSize: Text_Size.Text_9,
  },
});
