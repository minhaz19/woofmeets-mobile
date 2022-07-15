/* eslint-disable prettier/prettier */
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';
import HeaderText from '../../../common/text/HeaderText';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

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
  const colors = useTheme();

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event: DateTimePickerEvent, value?: any) {
    setDatePicker(false);
    setDate(value);
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
            value={date.toDateString()}
            placeholder="Enter your Dates"
          />
          <Ion
            name="chevron-forward-outline"
            size={24}
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
        />
      )}
      {/* {datePicker && (
        <CalendarList
          // horizontal={true}
          // pagingEnabled={true}
          calendarWidth={320}
          initialDate={'2012-03-01'}
          minDate={'2012-05-10'}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          monthFormat={'yyyy MM'}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          enableSwipeMonths={true}
        />
      )} */}
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
  headerText: {
    fontSize: Text_Size.Text_9,
  },
});
