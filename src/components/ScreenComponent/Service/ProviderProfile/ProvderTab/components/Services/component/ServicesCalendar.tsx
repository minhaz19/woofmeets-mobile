import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../../../../constants/Colors';
import TitleText from '../../../../../../../common/text/TitleText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
const orderRange = [
  '2022-08-10',
  '2022-08-11',
  '2022-08-12',
  '2022-08-13',
  '2022-08-14',
  '2022-08-15',
  '2022-08-16',
  '2022-08-17',
];
type StackParamList = {
  ProviderCalendar: {foo: string; onBar: () => void} | undefined;
};
type NavigationProps = StackNavigationProp<StackParamList>;

const ServicesCalendar = () => {
  const [_markedStyle, setMarkedStyle] = useState({});
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    const styledRange = orderRange.map((_: string, i: number) => ({
      [orderRange[i]]: {
        startingDay: i === 0,
        color: Colors.primary,
        textColor: 'white',
        endingDay: i === orderRange.length - 1,
      },
    }));
    let styledMarkedRange: any = {};

    styledRange?.map(
      (item: any) =>
        // @ts-ignore
        (styledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
    );
    setMarkedStyle(styledMarkedRange);
  }, []);
  return (
    <>
      <View>
        <Calendar
          style={styles.calenderStyles}
          // onDayPress={handleDayPress}
          markingType={'period'}
          markedDates={_markedStyle}
          minDate={new Date().toString()}
          enableSwipeMonths
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
      <TouchableOpacity onPress={() => navigation.navigate('ProviderCalendar')}>
        <TitleText textStyle={styles.title} text="View Full Calendar 🗓" />
      </TouchableOpacity>
    </>
  );
};

export default ServicesCalendar;

const styles = StyleSheet.create({
  containerCL: {},
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
});
