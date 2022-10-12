import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {CalendarList} from 'react-native-calendars';
import {useHandleRange} from '../../utils/helpers/CalendarRange/useHandleRange';
import Colors from '../../constants/Colors';
import {useTheme} from '../../constants/theme/hooks/useTheme';
interface Props {
  range?: number;
  selectType: string;
  handlePress?: (arg: any) => void;
}
const AppCalendar = ({range = 12, selectType, handlePress}: Props) => {
  const {colors} = useTheme();
  const {handleDayPress, singleSelect, _markedStyle} =
    useHandleRange(selectType);

  return (
    <View style={styles.contentContainer}>
      <CalendarList
        current={new Date().toString()}
        pastScrollRange={0}
        futureScrollRange={range}
        onDayPress={data => {
          handleDayPress(data);
          handlePress && handlePress(data);
        }}
        markingType={'custom'}
        markedDates={{
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
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default AppCalendar;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});
