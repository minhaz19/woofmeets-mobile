import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from '../../../common/TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import SwitchView from '../../../common/switch/SwitchView';
import Text_Size from '../../../../constants/textScaling';

const DayTimeSlot = () => {
  return (
    <View>
      <View>
        <TitleText textStyle={styles.headerText} text={'Pick walk times'} />
        <TitleText textStyle={styles.day} text={'Monday'} />
        <DescriptionText text={'Add one or more walk times'} />
        <TimeMultiSlotPicker />
      </View>
      <View>
        <TitleText textStyle={styles.day} text={'Monday'} />
        <View style={styles.checkContainer}>
          <DescriptionText text="Use same walk times as Mondays" />
          <SwitchView
            isActive={true}
            activeText=""
            inActiveText=""
            onSelect={() => {}}
          />
        </View>
        {/* <TimeMultiSlotPicker /> */}
      </View>
    </View>
  );
};

export default DayTimeSlot;

const styles = StyleSheet.create({
  headerText: {
    fontSize: Text_Size.Text_1,
  },
  day: {
    fontSize: Text_Size.Text_2,
    marginVertical: 10,
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
