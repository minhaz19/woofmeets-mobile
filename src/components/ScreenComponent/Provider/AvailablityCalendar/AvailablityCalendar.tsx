import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {orderAndStyleRange} from '../../../../utils/helpers/CalendarRange/orderAndStyleRange';
import {_dateRange} from '../../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../../constants/Colors';
import EditCart from './EditCart';

const RANGE = 12;
const initialDate = '2022-08-17';
const AvailablityCalendar = () => {
  const [_markedStyle, setMarkedStyle] = useState({});

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
  return (
    <View style={styles.container}>
      <CalendarList
        current={initialDate}
        pastScrollRange={0}
        futureScrollRange={RANGE}
        onDayPress={handleDayPress}
        markingType={'period'}
        markedDates={_markedStyle}
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
