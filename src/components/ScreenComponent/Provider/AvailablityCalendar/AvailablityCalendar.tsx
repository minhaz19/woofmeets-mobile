/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {orderAndStyleRange} from '../../../../utils/helpers/CalendarRange/orderAndStyleRange';
import {_dateRange} from '../../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../../constants/Colors';
import EditCart from './EditCart';

const RANGE = 12;
const initialDate = '2022-08-17';
const AvailablityCalendar = () => {
  const dateArray = [
    '2022-09-20',
    '2022-09-22',
    '2022-09-23',
    '2022-09-24',
    '2022-09-25',
    '2022-09-26',
    '2022-09-27',
    '2022-09-29',
    '2022-10-01',
    '2022-10-02',
    '2022-10-03',
    '2022-10-04',
    '2022-10-05',
    '2022-10-06',
    '2022-10-10',
    '2022-10-12',
    '2022-10-13',
    '2022-10-15',
    '2022-10-16',
  ];
  const [_markedStyle, setMarkedStyle] = useState({});
  const [preMarked, setPremarked] = useState({});

  const {startingDate, endingDate, resetRange, handleDayPress} =
    useHandleRange('range');

  useMemo(() => {
    const range: Boolean | Date[] =
      typeof startingDate !== 'undefined' &&
      typeof endingDate !== 'undefined' &&
      _dateRange(startingDate, endingDate);

    const {styledMarkedRange} = orderAndStyleRange(range, Colors.primary);

    setMarkedStyle(styledMarkedRange);
  }, [startingDate, endingDate]);
  useMemo(() => {
    const preStyled = dateArray.map((_: string, i: number) => ({
      [dateArray[i]]: {
        // startingDay: i === 0,
        color: Colors.primary,
        textColor: 'white',
        // endingDay: i === dateArray.length - 1,
      },
    }));
    let preStyledMarkedRange: any = {};
    const b =
      preStyled &&
      preStyled?.map(
        (item: any) =>
          // @ts-ignore
          (preStyledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
      );
    b && setPremarked(preStyledMarkedRange);
  }, []);
  return (
    <View style={styles.container}>
      <CalendarList
        current={initialDate}
        pastScrollRange={0}
        futureScrollRange={RANGE}
        onDayPress={handleDayPress}
        markingType={'period'}
        markedDates={{
          ..._markedStyle,
          ...preMarked,
        }}
        renderHeader={renderCustomHeader}
        calendarHeight={390}
        theme={theme}
        horizontal={false}
        pagingEnabled={true}
        staticHeader={false}
      />
      <EditCart startingDate={startingDate} resetRange={resetRange} />
    </View>
  );
};

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
        },
      },
    },
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8,
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800',
    },
  },
};

function renderCustomHeader(date: any) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle: TextStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.primary,
    paddingRight: 5,
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default AvailablityCalendar;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});
