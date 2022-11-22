import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {
  setDropIn,
  setDropOut,
} from '../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {useAppDispatch} from '../../store/store';
interface Props {
  selectType?: string;
  value?: any;
  dropOut?: boolean;
  setOpenCal: () => void;
}
const DateRange = ({value, dropOut, setOpenCal}: Props) => {
  const [singleSelect, setSingleSelect] = useState<string>('');
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const handleSelectDate = (date: any) => {
    if (dropOut) {
      dispatch(setDropOut(date));
    } else {
      dispatch(setDropIn(date));
    }
  };
  return (
    <View>
      <Calendar
        style={styles.calenderStyles}
        onDayPress={data => {
          setSingleSelect(data.dateString);
          handleSelectDate(data.dateString);
          setOpenCal();
        }}
        markingType={'custom'}
        markedDates={{
          // ..._markedStyle,
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
        minDate={value ? value.toString() : new Date().toString()}
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
  );
};

const styles = StyleSheet.create({
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
});
export default DateRange;
