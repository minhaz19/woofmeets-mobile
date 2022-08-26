import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {orderAndStyleRange} from '../../../utils/helpers/CalendarRange/orderAndStyleRange';
import {_dateRange} from '../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../utils/helpers/CalendarRange/useHandleRange';
// import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const RANGE = 24;
const initialDate = '2022-07-05';
interface Props {
  horizontalView?: boolean;
}
const AvailablityCalendar = (props: Props) => {
  const {horizontalView} = props;

  const [_markedStyle, setMarkedStyle] = useState({});
  // const {colors} = useTheme();

  const {startingDate, endingDate, handleDayPress} = useHandleRange('range');

  useMemo(() => {
    const range: Boolean | Date[] =
      typeof startingDate !== 'undefined' &&
      typeof endingDate !== 'undefined' &&
      _dateRange(startingDate, endingDate);

    const {styledMarkedRange} = orderAndStyleRange(range, Colors.primary);

    setMarkedStyle(styledMarkedRange);
  }, [startingDate, endingDate]);

  return (
    <CalendarList
      testID={'calendarList'}
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={handleDayPress}
      markingType={'period'}
      markedDates={_markedStyle}
      renderHeader={!horizontalView ? renderCustomHeader : undefined}
      calendarHeight={!horizontalView ? 390 : undefined}
      theme={!horizontalView ? theme : undefined}
      horizontal={false}
      pagingEnabled={horizontalView}
      staticHeader={horizontalView}
    />
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
    color: '#5E60CE',
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
