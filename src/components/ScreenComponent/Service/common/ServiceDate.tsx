import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Text_Size from '../../../../constants/textScaling';
import Ion from 'react-native-vector-icons/Ionicons';
import HeaderText from '../../../common/text/HeaderText';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment().add(100, 'days').format(_format);
interface Props {
  hText: string;
}
const screen = SCREEN_WIDTH;
const ServiceDate: FC<Props> = ({hText}) => {
  const colors = useTheme();
  const [selectedDates, setSelectedDates] = useState([]);
  const [datePicker, setDatePicker] = useState(false);
  const [_markedDates, setMarkedDates] = useState([]);

  const onDaySelect = (day: {dateString: moment.MomentInput}) => {
    let temp = [...selectedDates];
    const _selectedDay = moment(day.dateString).format(_format);

    let selected = true;
    //@ts-ignore
    if (_markedDates[_selectedDay]) {
      //@ts-ignore
      delete temp[_selectedDay];
      //@ts-ignore
      selected = !_markedDates[_selectedDay].selected;
    } else {
      //@ts-ignore
      temp.push(_selectedDay);
      setSelectedDates(temp);
    }
    const updatedMarkedDates = {
      ..._markedDates,
      ...{[_selectedDay]: {selected}},
    };
    setMarkedDates(updatedMarkedDates);
  };
  const showDatePicker = () => {
    setDatePicker(!datePicker);
  };
  const mapped = Object.keys(_markedDates).map((key: any) => {
    return {
      [key]: _markedDates[key],
    };
  });
  const checkedDates = mapped.filter(
    (e: any) => e[Object.keys(e)[0]].selected === true,
  );

  const filteredDates = checkedDates.map((i: any) => Object.keys(i));
  const newDates = filteredDates.flat();

  return (
    <View style={styles.container}>
      <HeaderText textStyle={styles.headerText} text={hText} />
      <Pressable onPress={showDatePicker}>
        <View
          pointerEvents="none"
          style={[
            styles.input,
            {backgroundColor: colors.colors.backgroundColor},
          ]}>
          <TextInput
            style={[styles.text, {color: colors.colors.placeholderTextColor}]}
            placeholderTextColor={colors.colors.placeholderTextColor}
            value={newDates.length === 0 ? '' : newDates.join(', ')}
            placeholder="Select your Dates"
          />
          <Ion
            name="chevron-forward-outline"
            size={18}
            color={colors.colors.descriptionText}
          />
        </View>
      </Pressable>
      {datePicker && (
        <Calendar
          style={styles.calenderStyles}
          minDate={_today}
          maxDate={_maxDate}
          onDayPress={onDaySelect}
          //@ts-ignore
          markedDates={_markedDates}
          enableSwipeMonths={true}
          disableMonthChange={true}
          hideExtraDays={true}
          theme={{
            backgroundColor: colors.colors.backgroundColor,
            calendarBackground: colors.colors.backgroundColor,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: colors.colors.headerText,
            todayTextColor: Colors.primary,
            dayTextColor: colors.colors.headerText,
            textDisabledColor: Colors.subText,
            arrowColor: colors.colors.headerText,
            disabledArrowColor: Colors.subText,
            monthTextColor: colors.colors.headerText,
            indicatorColor: colors.colors.headerText,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      )}
    </View>
  );
};

export default ServiceDate;

const styles = StyleSheet.create({
  container: {paddingTop: 10},
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    paddingVertical: screen > 390 ? -10 : 0,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
  headerText: {
    fontSize: Text_Size.Text_9,
  },
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
});
