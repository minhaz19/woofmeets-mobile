/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Platform, Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';
import HeaderText from '../../../common/text/HeaderText';

interface Props {
  hText: string;
  datePicker: boolean;
  date: Date;
  setDatePicker: (datePicker: boolean) => void;
  setDate: (date: Date) => void;
}
const screen = SCREEN_WIDTH;
const ServiceDates: FC<Props> = ({
  hText,
  datePicker,
  date,
  setDatePicker,
  setDate,
}) => {
  const [temp, setTemp] = useState(true);
  const colors = useTheme();
  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event: DateTimePickerEvent, value?: any) {
    setDatePicker(false);
    setDate(value);
    setTemp(false);
  }

  return (
    <View style={{paddingTop: 10}}>
      <HeaderText textStyle={styles.headerText} text={hText} />
      <Pressable onPress={showDatePicker}>
        <View
          pointerEvents="none"
          style={[
            styles.input,
            {backgroundColor: colors.colors.backgroundColor},
          ]}>
          <TextInput
            style={[styles.text, {color: colors.colors.placeholderTextColor}]}
            placeholderTextColor={colors.colors.placeholderTextColor}
            value={temp ? '' : date.toDateString()}
            placeholder="Select your Dates"
          />
          <Ion
            name="chevron-forward-outline"
            size={18}
            color={colors.colors.descriptionText}
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
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default ServiceDates;

const styles = StyleSheet.create({
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
  },

  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  headerText: {
    fontSize: Text_Size.Text_9,
  },
});
