/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {_dateRange} from '../../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../../constants/Colors';
import EditCart from './EditCart';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import TitleText from '../../../common/text/TitleText';
import {Setting} from '../../../../assets/svgs/SVG_LOGOS';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import Text_Size from '../../../../constants/textScaling';
import {useProviderAvailability} from './utils/useProviderAvailability';

const RANGE = 12;
const today = new Date();
const selectType = 'RANGE';

const AvailablityCalendar = () => {
  const {colors} = useTheme();
  const [preMarked, setPremarked] = useState({});
  const [isDayVisible, setIsDayVisible] = useState(false);
  const {loading, availabileDates, getAvailablity} = useProviderAvailability();
  const {
    singleSelect,
    startingDate,
    _markedStyle,
    endingDate,

    handleDayPress,
  } = useHandleRange(selectType);

  useMemo(() => {
    const preStyled = availabileDates.map((_: string, i: number) => ({
      [availabileDates[i]]: {
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
  }, [availabileDates]);

  function isBeforeToday(date: Date) {
    today.setHours(0, 0, 0, 0);
    return date < today;
  }
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
      <Calendar
        current={new Date().toString()}
        pastScrollRange={0}
        futureScrollRange={RANGE}
        onDayPress={handleDayPress}
        markingType={'custom'}
        markedDates={{
          ...preMarked,
          ..._markedStyle,
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
        style={styles.calenderStyles}
        minDate={today.toString()}
        enableSwipeMonths
        onMonthChange={monthData => {
          if (monthData.month === today.getMonth() + 1) {
            getAvailablity(monthData, 'current');
          } else if (isBeforeToday(new Date(monthData.dateString))) {
            return;
          } else {
            getAvailablity(monthData, 'next');
          }
        }}
        displayLoadingIndicator={loading}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
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
      <EditCart
        startingDate={startingDate}
        endingDate={endingDate}
        setIsDayVisible={setIsDayVisible}
        isDayVisible={isDayVisible}
      />
    </View>
  );
};

export default AvailablityCalendar;

const styles = StyleSheet.create({
  container: {flex: 1},
  calenderStyles: {
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
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
