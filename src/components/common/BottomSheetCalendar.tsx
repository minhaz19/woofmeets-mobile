import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import AppTouchableOpacity from './AppClickEvents/AppTouchableOpacity';
import TitleText from './text/TitleText';
import DescriptionText from './text/DescriptionText';
import {CalendarCSvg} from '../../assets/svgs/SVG_LOGOS';
import AppCalendar from './AppCalendar';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';
interface Props {
  title: string;
  sequence?: number;
  isRecurring?: boolean;
  setValue: (arg1: string, arg3: any) => void;
  initalData: string;
  watch: any;
}
var dayss = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const BottomSheetCalendar = ({
  title,
  isRecurring,
  setValue,
  initalData,
  watch,
}: Props) => {
  const [visible, setVisible] = useState(false);

  const {isDarkMode, colors} = useTheme();
  const {multiDate} = watch();
  const handlePress = (data: any) => {
    if (isRecurring) {
      const next6Days = [...Array(7).keys()].map(index => {
        const date = new Date(data.dateString);
        date.setDate(date.getDate() + index);
        var d = new Date(date);
        var dayName = dayss[d.getDay()];
        return {date: date.toDateString(), day: dayName};
      });
      const dayName = new Date(data.dateString).toLocaleString('en-us', {
        weekday: 'long',
      });
      setValue('recurringStartDate', data.dateString);
      setValue('selectedDays', [dayName]);
      setValue('repeatDate', next6Days);
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        {!visible && (
          <AppTouchableOpacity
            style={[
              styles.sectionContainer,
              {
                backgroundColor: isDarkMode ? Colors.lightDark : Colors.border,
                borderColor: colors.borderColor,
              },
            ]}
            onPress={() => setVisible(!visible)}>
            <View style={styles.textWidth}>
              <TitleText textStyle={styles.titleText} text={title} />
              <DescriptionText
                text={
                  !isRecurring
                    ? multiDate.length !== 0
                      ? multiDate?.join(' ')
                      : 'Tap to add dates'
                    : isRecurring && initalData !== ''
                    ? // : startDate !== '' && isRecurring === true
                      initalData
                    : 'Tap to add dates'
                }
                textStyle={{}}
              />
            </View>
            <View style={styles.iconContainer}>
              <CalendarCSvg fill="black" width={30} height={30} />
            </View>
          </AppTouchableOpacity>
        )}
        {visible ? (
          <Modal animated transparent visible={visible} animationType="fade">
            <Pressable
              style={styles.bgContainer}
              onPress={() => setVisible(!visible)}
            />

            <View
              style={[
                styles.pickerContainer,
                {
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              <View style={styles.calHeader}>
                <TitleText textStyle={styles.calTitle} text={'Select date'} />
                <AppTouchableOpacity onPress={() => setVisible(false)}>
                  <TitleText textStyle={styles.done} text={'Done'} />
                </AppTouchableOpacity>
              </View>
              <AppCalendar
                selectType={isRecurring ? 'SINGLE' : 'MULTI'}
                handlePress={handlePress}
                setValue={setValue}
              />
            </View>
          </Modal>
        ) : null}
      </View>
    </>
  );
};

export default memo(BottomSheetCalendar);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.background,
    borderRadius: 6,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
  },
  halfCont: {width: '50%'},
  label: {
    textTransform: 'capitalize',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calHeader: {
    marginTop: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calTitle: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
  },
  done: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
  },
  textWidth: {width: '85%'},
});
