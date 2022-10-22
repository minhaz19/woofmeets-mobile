import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from './TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';
import {useDayTimeSlot} from './utils/useDayTimeSlot';

const DayTimeSlot = () => {
  const {newData, isRecurring, handleMultipleCheck} = useDayTimeSlot();

  return (
    <View>
      {newData?.map((item: any, index: number) => (
        <View key={index}>
          {item.startDate ? (
            <View>
              <TitleText
                textStyle={styles.headerText}
                text={'Pick walk times'}
              />
              <TitleText textStyle={styles.day} text={item.date} />
              {/* <TitleText textStyle={styles.day} text={item.day} /> */}
              <DescriptionText text={'Add one or more walk times'} />
              <TimeMultiSlotPicker
                singleItem={item}
                isRecurring={isRecurring}
                initalSlot={item?.initalSlot}
              />
            </View>
          ) : (
            <View style={styles.section}>
              <TitleText textStyle={styles.day} text={item.date} />
              <View style={styles.checkContainer}>
                <DescriptionText text={`Use same walk times as ${item.day}`} />
                <SwitchView
                  isActive={item.active}
                  activeText=""
                  inActiveText=""
                  onSelect={() => {
                    // setActive(!active);
                    handleMultipleCheck(item.id);
                  }}
                />
              </View>
              {!item.active && (
                <TimeMultiSlotPicker
                  singleItem={item}
                  isRecurring={isRecurring}
                  initalSlot={item?.initalSlot}
                />
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default DayTimeSlot;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  day: {
    fontSize: Text_Size.Text_2,
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginVertical: 10,
  },
});
