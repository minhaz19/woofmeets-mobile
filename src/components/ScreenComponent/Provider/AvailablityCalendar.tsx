/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {orderAndStyleRange} from '../../../utils/helpers/CalendarRange/orderAndStyleRange';
import {_dateRange} from '../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../constants/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Text_Size from '../../../constants/textScaling';
import {Reset} from '../../../assets/svgs/SVG_LOGOS';

const RANGE = 12;
const initialDate = '2022-08-17';
const AvailablityCalendar = () => {
  const [_markedStyle, setMarkedStyle] = useState({});

  const {startingDate, endingDate, resetRange, handleDayPress} =
    useHandleRange('range');

  useMemo(() => {
    console.log(
      'start end',
      typeof startingDate,
      startingDate,
      typeof endingDate,
      endingDate,
    );
    const range: Boolean | Date[] =
      typeof startingDate !== 'undefined' &&
      typeof endingDate !== 'undefined' &&
      _dateRange(startingDate, endingDate);

    const {styledMarkedRange} = orderAndStyleRange(range, Colors.primary);

    setMarkedStyle(styledMarkedRange);
  }, [startingDate, endingDate]);

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  useMemo(() => {
    offset.value = withSpring(startingDate ? 10 / 100 : 300);
  }, [startingDate, offset]);
  return (
    <>
      <CalendarList
        // testID={'calendarList'}
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
      <Animated.View style={[styles.editContainer, animatedStyles]}>
        <View style={styles.availablity}>
          <TouchableOpacity
            style={{
              borderRightWidth: 1,
              borderRightColor: 'white',
              paddingVertical: 10,
              width: '70%',
            }}>
            <Text style={styles.mark}>Mark as unavailable</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRightWidth: 1,
              borderRightColor: 'white',
              paddingVertical: 10,
              width: '22%',
              alignItems: 'center',
            }}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.icon} onPress={resetRange}>
          <Reset width={30} height={20} fill={'white'} />
        </TouchableOpacity>
      </Animated.View>
    </>
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
  editContainer: {
    position: 'absolute',
    bottom: '10%',
    backgroundColor: Colors.primary,
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  availablity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mark: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  edit: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 25,
  },
});
