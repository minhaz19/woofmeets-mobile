/* eslint-disable react-native/no-inline-styles */
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppTouchableOpacity from './AppClickEvents/AppTouchableOpacity';
import TitleText from './text/TitleText';
import DescriptionText from './text/DescriptionText';
import {CalendarCSvg} from '../../assets/svgs/SVG_LOGOS';
import AppCalendar from './AppCalendar';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import {useFormContext} from 'react-hook-form';
import {useTheme} from '../../constants/theme/hooks/useTheme';
interface Props {
  title: string;
  sequence?: number;
  isRecurring?: boolean;
  setValue: (arg1: string, arg3: any) => void;
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
const BottomSheetCalendar = ({title, isRecurring, setValue}: Props) => {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const {getValues} = useFormContext();
  const {isDarkMode, colors} = useTheme();
  const {multiDate} = getValues();
  const handlePress = (data: any) => {
    const next6Days = [...Array(7).keys()].map(index => {
      const date = new Date(data.dateString);
      date.setDate(date.getDate() + index);
      var d = new Date(date);
      var dayName = dayss[d.getDay()];
      return {date: date.toDateString(), day: dayName};
    });
    setValue('recurringStartDate', data.dateString);
    setValue('repeatDate', next6Days);
    setStartDate(data.dateString);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: visible ? 'rgba(0,0,0,0.5)' : '#f1f1f1',
            zIndex: 99999,
            position: visible ? 'absolute' : 'relative',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: 10,
          },
        ]}>
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
            <View style={{width: '85%'}}>
              <TitleText textStyle={styles.titleText} text={title} />
              <DescriptionText
                text={
                  !isRecurring
                    ? multiDate !== ''
                      ? multiDate?.join(' ')
                      : 'Tap to add dates'
                    : startDate !== '' && isRecurring === true
                    ? startDate
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
        <Modal animated transparent visible={visible} animationType="slide">
          <Pressable
            style={styles.bgContainer}
            onPress={() => setVisible(!visible)}
          />

          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: colors.backgroundColor,
                borderTopWidth: 2,
                borderTopColor: Colors.primary,
              },
            ]}>
            <TitleText
              textStyle={{
                fontWeight: 'bold',
                fontSize: Text_Size.Text_1,
                margin: 20,
              }}
              text={'Select date range 🗓'}
            />
            <AppCalendar
              selectType={isRecurring ? 'SINGLE' : 'MULTI'}
              handlePress={handlePress}
              setValue={setValue}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

export default BottomSheetCalendar;

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
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
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
});
