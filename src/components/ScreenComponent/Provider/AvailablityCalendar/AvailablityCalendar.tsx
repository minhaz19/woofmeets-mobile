/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, StyleSheet, TextStyle, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {_dateRange} from '../../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../../constants/Colors';
import EditCart from './EditCart';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import TitleText from '../../../common/text/TitleText';
import {Setting} from '../../../../assets/svgs/SVG_LOGOS';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import Text_Size from '../../../../constants/textScaling';

const RANGE = 12;
const selectType = 'RANGE';
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
const AvailablityCalendar = () => {
  const {colors} = useTheme();
  const [preMarked, setPremarked] = useState({});
  const [isDayVisible, setIsDayVisible] = useState(false);
  const {
    singleSelect,
    startingDate,
    _markedStyle,
    endingDate,
    reset,
    handleDayPress,
  } = useHandleRange(selectType);

  useMemo(() => {
    const preStyled = dateArray.map((_: string, i: number) => ({
      [dateArray[i]]: {
        customStyles: {
          container: {
            backgroundColor: Colors.primary,
            elevation: 2,
            // borderRadius: 10,
            width: '100%',
            borderRadius: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'white',
          },
        },
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
      <View style={styles.headerContainer}>
        <TitleText
          text={'Provider Availability : '}
          textStyle={styles.headerText}
        />
        <AppTouchableOpacity onPress={() => setIsDayVisible(true)}>
          <Setting width={30} height={30} fill={colors.headerText} />
        </AppTouchableOpacity>
      </View>
      <CalendarList
        current={new Date().toString()}
        pastScrollRange={0}
        futureScrollRange={RANGE}
        onDayPress={handleDayPress}
        markingType={'custom'}
        markedDates={{
          ..._markedStyle,
          ...preMarked,
          [singleSelect]: {
            customStyles: {
              container: {
                backgroundColor: Colors.primary,
                elevation: 2,
                borderRadius: 10,

                justifyContent: 'center',
                alignItems: 'center',
              },
              text: {
                color: 'white',
              },
            },
          },
        }}
        renderHeader={renderCustomHeader}
        theme={{
          stylesheet: {
            calendar: {
              header: {
                dayHeader: {
                  fontWeight: 'bold',
                  color: Colors.primary,
                },
              },
            },
          },
          // @ts-ignore
          'stylesheet.day.basic': {
            today: {
              borderColor: Colors.border,
              borderWidth: 0.8,
            },
            todayText: {
              color: Colors.primary,
              fontWeight: '800',
            },
          },
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
      <EditCart
        startingDate={startingDate}
        endingDate={endingDate}
        setIsDayVisible={setIsDayVisible}
        isDayVisible={isDayVisible}
      />
    </View>
  );
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
      <TitleText
        text={`${month}`}
        textStyle={{...styles.month, ...textStyle}}
      />
      <TitleText text={year} textStyle={{...styles.year, ...textStyle}} />
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 15,
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
  },
});
