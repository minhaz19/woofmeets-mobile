/* eslint-disable @typescript-eslint/no-unused-vars */
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {_dateRange} from '../../../../utils/helpers/datesArray';
import {useHandleRange} from '../../../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../../../constants/Colors';
import EditCart from './EditCart';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';
import {useProviderAvailability} from './utils/useProviderAvailability';
import {getAvailableDays} from '../../../../store/slices/Provider/Unavailability/getAvailableDay';
import format from 'date-fns/format';
import {useAppDispatch} from '../../../../store/store';
import AvailableService from './AvailableService';
import TitleText from '../../../common/text/TitleText';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
import BottomSpacing from '../../../UI/BottomSpacing';

const RANGE = 12;
const today = new Date();
const selectType = 'RANGE';
function isBeforeToday(date: Date) {
  today.setHours(0, 0, 0, 0);
  return date < today;
}
const AvailablityCalendar = () => {
  const {colors} = useTheme();
  const [preMarked, setPremarked] = useState({});
  const [availabledays, setAvailableDays] = useState([]);
  const [resetAvailableService, setResetAvailableService] = useState([]);
  const [resetLoading, setResetLoading] = useState(false);
  const [modMarkDate, setModMarkDate] = useState({});
  const [monthRef, setMonthRef] = useState({});
  const {loading, availabileDates, getAvailablity, availableService} =
    useProviderAvailability();

  const [foundAvailable, setFoundAvailable] = useState(false);
  const {
    singleSelect,
    startingDate,
    _markedStyle,
    endingDate,
    handleDayPress,
    resetSelection,
  } = useHandleRange(selectType);
  const dispatch = useAppDispatch();
  useMemo(() => {
    const preStyled = availabledays.map((_: string, i: number) => ({
      [availabledays[i]]: {
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
  }, [availabledays]);

  useEffect(() => {
    const matchIndex = availabileDates.findIndex(item => item === startingDate);
    matchIndex !== -1 ? setFoundAvailable(true) : setFoundAvailable(false);
  }, [availabileDates, startingDate]);
  useEffect(() => {
    dispatch(getAvailableDays());
    const monthData = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      dateString: format(new Date(), 'yyyy-MM-dd'),
    };
    getAvailablity(monthData, 'current');
  }, []);

  useEffect(() => {
    setAvailableDays(availabileDates);
    setModMarkDate(_markedStyle);
    setResetAvailableService(availableService);
    setResetLoading(loading);
  }, [availabileDates, loading, _markedStyle, availableService]);
  console.log('availableService', _markedStyle);
  return (
    <>
      {resetLoading && <AppActivityIndicator visible={resetLoading} />}
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View>
            <AvailableService availableService={resetAvailableService} />
          </View>
          <TitleText
            textStyle={styles.calendarText}
            text={'Availability Calendar View'}
          />
          <Calendar
            current={new Date().toString()}
            pastScrollRange={0}
            futureScrollRange={RANGE}
            onDayPress={handleDayPress}
            markingType={'custom'}
            markedDates={{
              ...preMarked,
              ...modMarkDate,
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
              setMonthRef(monthData);
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
          <BottomSpacing />
          <BottomSpacing />
        </ScrollView>
        <EditCart
          startingDate={startingDate}
          endingDate={endingDate}
          foundAvailable={foundAvailable}
          setAvailableDays={setAvailableDays}
          setModMarkDate={setModMarkDate}
          setResetAvailableService={setResetAvailableService}
          setResetLoading={setResetLoading}
          monthRef={monthRef}
          resetSelection={resetSelection}
          _markedStyle={_markedStyle}
        />
      </View>
    </>
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
  calendarText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
