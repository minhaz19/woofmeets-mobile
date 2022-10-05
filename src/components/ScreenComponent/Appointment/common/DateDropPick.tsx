/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import {Calendar, ClockSvg} from '../../../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import TimeSlotPicker from '../../../common/TimeRangePicker';
import AppCalendar from '../../../common/AppCalendar';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const DateDropPick = () => {
  const [startSlot, setStartSlot] = useState();
  const [endSlot, setEndSlot] = useState();
  const [visible, setVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <TitleText textStyle={styles.headerText} text={'Schedule'} />
          <AppTouchableOpacity
            style={styles.sectionContainer}
            onPress={handlePresentModalPress}>
            <View>
              <TitleText textStyle={styles.titleText} text={'Dates'} />
              <DescriptionText text={'Tap to add dates'} />
            </View>
            <View style={styles.iconContainer}>
              <Calendar fill="black" width={30} height={30} />
            </View>
          </AppTouchableOpacity>

          <View style={styles.slotContainer}>
            <AppTouchableOpacity
              style={styles.slot}
              onPress={() => setVisible(!visible)}>
              <TitleText textStyle={{}} text={'Start range'} />
              <View style={styles.iconContainer}>
                <ClockSvg fill="black" />
              </View>
            </AppTouchableOpacity>
            <AppTouchableOpacity
              style={styles.slot}
              onPress={() => setVisible(!visible)}>
              <TitleText textStyle={{}} text={'End range'} />
              <View style={styles.iconContainer}>
                <ClockSvg fill="black" />
              </View>
            </AppTouchableOpacity>
          </View>
          <TimeSlotPicker visible={visible} setVisbile={setVisible} />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <AppCalendar />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

export default DateDropPick;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginBottom: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.background,
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
    padding: 20,
  },
});
