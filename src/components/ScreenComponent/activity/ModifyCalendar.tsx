import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import TitleText from '../../common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import moment from 'moment';

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment().add(100, 'days').format(_format);

const ModifyCalendar = (props: {
  title: string;
  icon:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const {colors} = useTheme();
  const [selectedDates, setSelectedDates] = useState('');
  const [openCal, setOpenCal] = useState(false);
  const [_markedDates, setMarkedDates] = useState({});

  const onDaySelect = (day: {dateString: moment.MomentInput}) => {
    const _selectedDay = moment(day.dateString).format(_format);

    let selected = true;
    //@ts-ignore
    if (_markedDates[_selectedDay]) {
      //@ts-ignore
      delete selectedDates[_selectedDay];
      //@ts-ignore
      selected = !_markedDates[_selectedDay].selected;
    } else {
      setSelectedDates(_selectedDay);
    }

    const updatedMarkedDates = {
      [_selectedDay]: {
        selected: selected,
      },
    };
    setMarkedDates(updatedMarkedDates);
    setSelectedDates(_selectedDay);
  };

  return (
    <>
      <View style={styles.innerContainer}>
        {props.icon}
        <View style={styles.textContainer}>
          <TitleText text={props.title} />
          <Pressable onPress={() => setOpenCal(!openCal)}>
            <View pointerEvents="none">
              <TextInput
                style={[styles._input, {color: colors.placeholderTextColor}]}
                placeholderTextColor={colors.placeholderTextColor}
                value={selectedDates}
                placeholder="Select your Dates"
              />
            </View>
          </Pressable>
        </View>
      </View>
      {openCal && (
        <Calendar
          style={styles.calenderStyles}
          minDate={_today}
          maxDate={_maxDate}
          onDayPress={onDaySelect}
          markedDates={_markedDates}
          enableSwipeMonths={true}
          disableMonthChange={true}
          hideExtraDays={true}
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
      )}
    </>
  );
};

export default ModifyCalendar;

const styles = StyleSheet.create({
  calenderStyles: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  textContainer: {
    paddingLeft: '2%',
  },
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
    fontSize: Text_Size.Text_11,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
});
