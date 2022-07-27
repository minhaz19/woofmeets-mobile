/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {_dateRange} from '../../utils/helpers/datesArray';
import {colors} from '../../constants/theme/textTheme';
import Colors from '../../constants/Colors';

const DateRange = () => {
  const [step, setSteps] = useState(1);

  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [_markedStyle, setMarkedStyle] = useState({});

  const handleDayPress = (day: any) => {
    // console.log('getting date', day.dateString, step);
    // const start = startingDate !== '' && new Date(startingDate);
    // const end = endingDate !== '' && new Date(endingDate);
    // if (start > end) {
    //   setStartingDate(endingDate);
    //   setEndingDate(startingDate);
    //   console.log('getting date', startingDate, endingDate);
    // }
    // console.log('start, end', startingDate, endingDate);
    if (step === 1) {
      setSteps(2);
      setStartingDate(day.dateString);
    } else if (step === 2) {
      setSteps(1);
      setEndingDate(day.dateString);
    }
  };
  useEffect(() => {
    const range =
      typeof startingDate !== 'undefined' &&
      typeof endingDate !== 'undefined' &&
      _dateRange(startingDate, endingDate);

    const unorderedRange =
      range &&
      range?.map(
        date =>
          new Date(date).getFullYear() +
          '-' +
          // @ts-ignore
          parseInt(new Date(date).getMonth() + 1) +
          '-' +
          new Date(date).getDate(),
      );
    let orderRange: any = [];
    unorderedRange &&
      unorderedRange.map(or =>
        orderRange.push(
          or
            .split('-')
            .map(p => (parseInt(p) <= 9 ? '0' + p : p))
            .join('-'),
        ),
      );

    const styledRange =
      orderRange.length !== 0 &&
      orderRange.map((_: string, i: number) => ({
        [orderRange[i]]: {
          startingDay: i === 0,
          color: Colors.primary,
          textColor: 'white',
          endingDay: i === orderRange.length - 1,
        },
      }));
    let cc: any = {};

    styledRange !== false &&
      styledRange?.map(
        (item: any, i: number) =>
          // @ts-ignore
          (cc[Object.keys(item)] = Object.values(item)[0]),
      );

    setMarkedStyle(cc);
  }, [startingDate, endingDate]);

  return (
    <View style={styles.containerCL}>
      <Calendar
        style={styles.calenderStyles}
        onDayPress={handleDayPress}
        markingType={'period'}
        markedDates={_markedStyle}
        // minDate={'2022-05-10'}
        // maxDate={'2022-05-1'}
        theme={{
          backgroundColor: colors.backgroundColor,
          calendarBackground: colors.backgroundColor,
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: Colors.headerText,
          todayTextColor: Colors.primary,
          dayTextColor: Colors.headerText,
          textDisabledColor: Colors.subText,
          arrowColor: Colors.headerText,
          disabledArrowColor: Colors.subText,
          monthTextColor: Colors.headerText,
          indicatorColor: Colors.headerText,
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
