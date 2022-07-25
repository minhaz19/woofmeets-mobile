/* eslint-disable radix */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {_dateRange} from '../../utils/helpers/datesArray';

const DateRange = () => {
  const [step, setSteps] = useState(1);

  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [datesRange, setDatesRange] = useState([]);
  const [key, setKey] = useState('');

  const [_markedDates, setMarkedDates] = useState([]);
  const handleDayPress = (day: any) => {
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
    setDatesRange(orderRange);
    orderRange.map((date: any) => setKey(date));
  }, [startingDate, endingDate]);
  //   const objectmod = {
  //     ...datesRange.map(date => {
  //       return {
  //         [date]: {color: '#70d7c7', textColor: 'white'},
  //       };
  //     }),
  //   };
  console.log('starting and ending', key);
  return (
    <View style={styles.containerCL}>
      <Calendar
        onDayPress={handleDayPress}
        // firstDay={1}
        // hideDayNames={true}
        // showWeekNumbers={true}
        // onPressArrowLeft={subtractMonth => subtractMonth()}
        // onPressArrowRight={addMonth => addMonth()}
        markingType={'period'}
        markedDates={{
          [datesRange[0]]: {
            startingDay: true,
            color: '#50cebb',
            textColor: 'white',
          },

          [key]: {
            color: '#70d7c7',
            textColor: 'white',
          },
          [datesRange[datesRange.length - 1]]: {
            endingDay: true,
            color: '#50cebb',
            textColor: 'white',
          },
        }}
      />
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  containerCL: {
    marginHorizontal: 20,
  },
});
