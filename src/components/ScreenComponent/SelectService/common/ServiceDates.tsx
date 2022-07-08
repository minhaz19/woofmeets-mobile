/* eslint-disable prettier/prettier */
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';

interface Props {
  hText: string;
  onDateSelected: (_event: DateTimePickerEvent, value?: any) => void;
  showDatePicker: () => void;
  datePicker: boolean;
  date: Date;
}
const screen = SCREEN_WIDTH;
const ServiceDates: FC<Props> = ({
  hText,
  // onDateSelected,
  // showDatePicker,
  // datePicker,
  // date,
}) => {
  const colors = useTheme();
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event: DateTimePickerEvent, value?: any) {
    setDate(value);
    setDatePicker(false);
  }

  return (
    <View style={{paddingTop: 10}}>
      <Text style={[styles.header, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <Pressable onPress={showDatePicker}>
        <View
          pointerEvents="none"
          style={[
            styles.input,
            {backgroundColor: colors.colors.backgroundColor},
          ]}>
          <TextInput
            style={[styles.text, {color: colors.colors.placeholderTextColor}]}
            value={date.toDateString()}
            placeholder="Enter your Dates"
          />
          <Ion
            name="chevron-forward-outline"
            size={24}
            style={{paddingRight: 10}}
            color={colors.colors.headerText}
          />
        </View>
      </Pressable>
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

export default ServiceDates;

const styles = StyleSheet.create({
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    paddingVertical: screen > 390 ? -10 : 0,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
    flex: 0,
    color: 'black',
  },

  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
