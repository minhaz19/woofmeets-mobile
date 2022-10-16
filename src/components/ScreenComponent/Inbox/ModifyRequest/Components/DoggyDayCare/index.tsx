import AppHalfTabs from '../../../../../common/AppHalfTabs';
import AppDayPicker from '../../../../../common/AppDayPicker';
import {colors} from '../../../../../../constants/theme/textTheme';
import {Calendar, Repeat} from '../../../../../../assets/svgs/SVG_LOGOS';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CalendarCSvg, ClockSvg} from '../../../../../../assets/svgs/SVG_LOGOS';
import TitleText from '../../../../../common/text/TitleText';
import AppTouchableOpacity from '../../../../../common/AppClickEvents/AppTouchableOpacity';
import DescriptionText from '../../../../../common/text/DescriptionText';
import {useFormContext} from 'react-hook-form';
import {useTheme} from '../../../../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../../../../store/store';
import Colors from '../../../../../../constants/Colors';
import TimeSlotPicker from '../../../../../common/TimeRangePicker';
import ShortText from '../../../../../common/text/ShortText';
import AppCalendar from '../../../../../common/AppCalendar';
import Text_Size from '../../../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../../../constants/WindowSize';
const DoggyDayCare = () => {
  const [scheduleId, setScheduleId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [pickVisible, setPickVisible] = useState(false);
  const {setValue} = useFormContext();

  const {isDarkMode} = useTheme();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {
    proposalStartDate,
    proposalEndDate,
    dropOffStartTime,
    dropOffEndTime,
    pickUpStartTime,
    pickUpEndTime,
  } = proposedServiceInfo;
  const schedule = [
    {
      id: 1,
      title: 'Specific Dates',
      Icon: <Calendar width={20} height={20} fill={colors.headerText} />,
      value: false,
    },
    {
      id: 2,
      title: 'Repeat weekly',
      Icon: <Repeat width={30} height={30} fill={colors.headerText} />,
      value: true,
    },
  ];
  return (
    <View style={styles.container}>
      <AppHalfTabs
        title="Schedule"
        data={schedule}
        //@ts-ignore
        setScheduleId={setScheduleId}
        name="isRecurring"
      />
      {scheduleId === 1 && <AppDayPicker />}
      <View style={[styles.sContainer]}>
        <TitleText textStyle={styles.headerText} text={'Schedule'} />

        <AppTouchableOpacity
          style={[
            styles.sectionContainer,
            {backgroundColor: isDarkMode ? Colors.lightDark : Colors.border},
          ]}
          onPress={() => setVisible(!visible)}>
          <View style={styles.textWidth}>
            <TitleText textStyle={styles.titleText} text={'Dates'} />
            <DescriptionText
              text={
                proposalStartDate !== ''
                  ? `( From: ${proposalStartDate} To: ${proposalEndDate})`
                  : 'Tap to add dates'
              }
            />
          </View>
          <View style={styles.iconContainer}>
            <CalendarCSvg fill="black" width={30} height={30} />
          </View>
        </AppTouchableOpacity>

        <View style={styles.slotContainer}>
          <>
            <AppTouchableOpacity
              style={[
                styles.slot,
                {
                  backgroundColor: isDarkMode
                    ? Colors.lightDark
                    : Colors.border,
                },
              ]}
              onPress={() => setDropVisible(!dropVisible)}>
              <View>
                <TitleText textStyle={styles.done} text={'Drop-Off'} />
                <ShortText
                  textStyle={{}}
                  text={
                    dropOffStartTime !== ''
                      ? 'From:' + dropOffStartTime
                      : 'Tap Drop-off'
                  }
                />
                {dropOffEndTime !== '' && (
                  <ShortText textStyle={{}} text={'To:' + dropOffEndTime} />
                )}
              </View>
              <View style={styles.iconContainer}>
                <ClockSvg fill="black" />
              </View>
            </AppTouchableOpacity>
            <TimeSlotPicker
              visible={dropVisible}
              setVisbile={setDropVisible}
              title={'Drop Off Time Slot ⏰'}
              startName={'dropOffStartTime'}
              endName={'dropOffEndTime'}
            />
          </>
          <>
            <AppTouchableOpacity
              style={[
                styles.slot,
                {
                  backgroundColor: isDarkMode
                    ? Colors.lightDark
                    : Colors.border,
                },
              ]}
              onPress={() => setPickVisible(!pickVisible)}>
              <View>
                <TitleText textStyle={styles.done} text={'Pick-Up'} />
                <ShortText
                  textStyle={{}}
                  text={
                    pickUpStartTime !== ''
                      ? 'From:' + pickUpStartTime
                      : 'Tap Pick-up'
                  }
                />
                {pickUpEndTime !== '' && (
                  <ShortText textStyle={{}} text={'To:' + pickUpEndTime} />
                )}
              </View>
              <View style={styles.iconContainer}>
                <ClockSvg fill="black" />
              </View>
            </AppTouchableOpacity>
            <TimeSlotPicker
              visible={pickVisible}
              setVisbile={setPickVisible}
              title={'Pick Up Time Slot ⏰'}
              startName={'pickUpStartTime'}
              endName={'pickUpEndTime'}
            />
          </>
        </View>

        <Modal animated transparent visible={visible} animationType="fade">
          <Pressable
            style={styles.bgContainer}
            onPress={() => setVisible(!visible)}
          />
          <View style={styles.pickerContainer}>
            <View style={styles.calHeader}>
              <TitleText textStyle={styles.title} text={'Select date'} />
              <AppTouchableOpacity onPress={() => setVisible(false)}>
                <TitleText textStyle={styles.calDone} text={'Done'} />
              </AppTouchableOpacity>
            </View>
            <AppCalendar selectType={'RANGE'} setValue={setValue} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default DoggyDayCare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginBottom: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 6,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slot: {
    width: (SCREEN_WIDTH - 50) / 2,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.border,
    borderRadius: 10,
  },
  sContainer: {
    paddingVertical: 20,
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
  },
  bgContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calHeader: {
    marginVertical: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
  },
  calDone: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
  },
  done: {fontWeight: 'bold'},
  textWidth: {width: '85%'},
});
