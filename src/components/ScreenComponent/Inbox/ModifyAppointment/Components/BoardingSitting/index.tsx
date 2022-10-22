import {StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import {ClockSvg} from '../../../../../../assets/svgs/SVG_LOGOS';
import TitleText from '../../../../../common/text/TitleText';
import AppTouchableOpacity from '../../../../../common/AppClickEvents/AppTouchableOpacity';
import {useTheme} from '../../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../../constants/Colors';
import TimeSlotPicker from '../../../../../common/TimeRangePicker';
import ShortText from '../../../../../common/text/ShortText';
import Text_Size from '../../../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../../../constants/WindowSize';
import BScalendar from './components/BScalendar';
import {useFormContext} from 'react-hook-form';

const BoardingSitting = () => {
  const [dropVisible, setDropVisible] = useState(false);
  const [pickVisible, setPickVisible] = useState(false);
  const {getValues} = useFormContext();
  const {
    proposalStartDate,
    dropOffStartTime,
    dropOffEndTime,
    pickUpStartTime,
    pickUpEndTime,
  } = getValues();

  const {isDarkMode} = useTheme();

  return (
    <View style={[styles.container]}>
      <TitleText textStyle={styles.headerText} text={'Schedule'} />
      <BScalendar />
      <View style={styles.slotContainer}>
        <>
          <AppTouchableOpacity
            style={[
              styles.slot,
              {backgroundColor: isDarkMode ? Colors.lightDark : Colors.border},
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
              {backgroundColor: isDarkMode ? Colors.lightDark : Colors.border},
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
    </View>
  );
};

export default memo(BoardingSitting);

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginBottom: 10,
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
  container: {
    paddingVertical: 20,
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
  },

  done: {fontWeight: 'bold'},
});
