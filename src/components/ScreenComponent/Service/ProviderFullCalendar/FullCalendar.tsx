/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CalendarList} from 'react-native-calendars';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useMarkedStyles} from '../ProviderProfile/ProvderTab/components/Services/component/utils/useMarkedStyles';
interface Props {
  availability: [string];
}
const FullCalendar = ({availability}: Props) => {
  const {colors} = useTheme();
  const {_markedStyle} = useMarkedStyles(availability);
  const today = new Date();
  const maxRange = 11 - today.getMonth() + 12;

  return (
    <View style={styles.container}>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        calendarStyle={styles.calenderStyles}
        onVisibleMonthsChange={months => {}}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={0}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={maxRange}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={false}
        markingType={'custom'}
        markedDates={_markedStyle}
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
