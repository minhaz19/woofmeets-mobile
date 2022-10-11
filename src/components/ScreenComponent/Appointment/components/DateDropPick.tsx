/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import {CalendarCSvg, ClockSvg} from '../../../../assets/svgs/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import TimeSlotPicker from '../../../common/TimeRangePicker';
import AppCalendar from '../../../common/AppCalendar';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
interface Props {
  serviceId?: number;
}
const DateDropPick = ({serviceId}: Props) => {
  const [visible, setVisible] = useState(false);
  const [slotVisible, setSlotVisible] = useState(false);

  return (
    <View>
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
          },
        ]}>
        <TitleText textStyle={styles.headerText} text={'Schedule'} />
        {serviceId === 4 || !visible === true ? null : (
          <AppTouchableOpacity
            style={styles.sectionContainer}
            onPress={() => setVisible(!visible)}>
            <View>
              <TitleText textStyle={styles.titleText} text={'Dates'} />
              <DescriptionText text={'Tap to add dates'} />
            </View>
            <View style={styles.iconContainer}>
              <CalendarCSvg fill="black" width={30} height={30} />
            </View>
          </AppTouchableOpacity>
        )}

        <View style={styles.slotContainer}>
          <AppTouchableOpacity
            style={styles.slot}
            onPress={() => setSlotVisible(!slotVisible)}>
            <TitleText textStyle={{}} text={'Start range'} />
            <View style={styles.iconContainer}>
              <ClockSvg fill="black" />
            </View>
          </AppTouchableOpacity>
          <AppTouchableOpacity
            style={styles.slot}
            onPress={() => setSlotVisible(!slotVisible)}>
            <TitleText textStyle={{}} text={'End range'} />
            <View style={styles.iconContainer}>
              <ClockSvg fill="black" />
            </View>
          </AppTouchableOpacity>
        </View>
        <TimeSlotPicker visible={slotVisible} setVisbile={setSlotVisible} />

        <Modal animated transparent visible={visible} animationType="slide">
          <Pressable
            style={styles.bgContainer}
            onPress={() => setVisible(!visible)}
          />
          <View style={styles.pickerContainer}>
            <TitleText
              textStyle={{
                fontWeight: 'bold',
                color: Colors.text,
                fontSize: Text_Size.Text_1,
              }}
              text={'Select date range'}
            />
            <AppCalendar selectType="RANGE" />
          </View>
        </Modal>
      </View>
    </View>
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
    backgroundColor: Colors.border,
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
  container: {
    paddingVertical: 20,
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  bgContainer: {
    flex: 1,
  },
});
