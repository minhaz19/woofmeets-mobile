/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Colors from '../../constants/Colors';
import {Calendar} from 'react-native-calendars';
import {_dateRange} from '../../utils/helpers/datesArray';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {useHandleRange} from '../../utils/helpers/CalendarRange/useHandleRange';
import {orderAndStyleRange} from '../../utils/helpers/CalendarRange/orderAndStyleRange';
interface Props {
  name: string;
}
const DateRange = ({name}: Props) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  const {colors} = useTheme();

  const {startingDate, endingDate, handleDayPress} = useHandleRange();

  useMemo(() => {
    const range: Boolean | Date[] =
      typeof startingDate !== 'undefined' &&
      typeof endingDate !== 'undefined' &&
      _dateRange(startingDate, endingDate);

    const {styledMarkedRange} = orderAndStyleRange(range, Colors.primary);

    setMarkedStyle(styledMarkedRange);
  }, [startingDate, endingDate]);

  return (
    <View style={styles.containerCL}>
      <Calendar
        style={styles.calenderStyles}
        onDayPress={handleDayPress}
        markingType={'period'}
        markedDates={_markedStyle}
        minDate={new Date().toString()}
        enableSwipeMonths
        theme={{
          backgroundColor: colors.backgroundColor,
          calendarBackground: colors.backgroundColor,
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: Colors.headerText,
          todayTextColor: Colors.primary,
          dayTextColor: colors.headerText,
          textDisabledColor: Colors.gray,
          arrowColor: Colors.headerText,
          disabledArrowColor: Colors.subText,
          monthTextColor: colors.headerText,
          indicatorColor: colors.headerText,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  containerCL: {},
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
});
