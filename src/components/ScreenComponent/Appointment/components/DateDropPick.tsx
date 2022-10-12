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
interface Props {
  serviceId?: number;
}
const slots = [
  {
    id: 0,
    title: 'Drop-Off',
    modal: 'Drop Off Time Slot ⏰',
    startName: 'dropOffStartTime',
    endName: 'dropOffEndTime',
  },
  {
    id: 1,
    title: 'Pick-Up',
    modal: 'Pick Up Time Slot ⏰',
    startName: 'pickUpStartTime',
    endName: 'pickUpEndTime',
  },
];
const DateDropPick = ({serviceId}: Props) => {
  const [visible, setVisible] = useState(false);
  const [slotVisible, setSlotVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        // {
        //   backgroundColor: visible ? 'rgba(0,0,0,0.5)' : '#f1f1f1',
        //   zIndex: 99999,
        //   position: visible ? 'absolute' : 'relative',
        //   top: 0,
        //   right: 0,
        //   bottom: 0,
        //   left: 0,
        // },
      ]}>
      <TitleText textStyle={styles.headerText} text={'Schedule'} />
      {(serviceId === 4 || serviceId === 1 || serviceId === 2) && (
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
        {slots.map((item, index) => (
          <>
            <AppTouchableOpacity
              style={styles.slot}
              key={index}
              onPress={() => setSlotVisible(!slotVisible)}>
              <TitleText textStyle={{}} text={item.title} />
              <View style={styles.iconContainer}>
                <ClockSvg fill="black" />
              </View>
            </AppTouchableOpacity>
            <TimeSlotPicker
              visible={slotVisible}
              setVisbile={setSlotVisible}
              title={item.modal}
              startName={item.startName}
              endName={item.endName}
            />
          </>
        ))}
      </View>

      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable
          style={styles.bgContainer}
          onPress={() => setVisible(!visible)}
        />
        <View style={styles.pickerContainer}>
          <AppCalendar selectType="RANGE" />
        </View>
      </Modal>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
