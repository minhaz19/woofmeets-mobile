/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CalendarList} from 'react-native-calendars';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';

const FullCalendar = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        calendarStyle={styles.calenderStyles}
        onVisibleMonthsChange={months => {
          // console.log('now these months are visible', months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={false}
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '20%' : 20,
  },
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
    // marginHorizontal: 20,
  },
});

export default FullCalendar;
