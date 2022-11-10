import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import TitleText from '../../../common/text/TitleText';
import TimeMultiSlotPicker from './TimeMultiSlotPicker';
import DescriptionText from '../../../common/text/DescriptionText';
import Text_Size from '../../../../constants/textScaling';
import {useDayTimeSlot} from './utils/useDayTimeSlot';
interface Props {
  setValue: any;
  watch: any;
}
const DayTimeSlot = ({setValue, watch}: Props) => {
  const {newData, isRecurring} = useDayTimeSlot();

  return (
    <View>
      {newData?.map((item: any, index: number) => (
        <View key={index}>
          <View style={styles.section}>
            <TitleText textStyle={styles.day} text={item.date} />
            <View style={styles.checkContainer}>
              <DescriptionText
                text={`Please select the time slots for ${item.date}`}
              />
            </View>

            <TimeMultiSlotPicker
              singleItem={item}
              isRecurring={isRecurring}
              initalSlot={item?.initalSlot}
              setValue={setValue}
              watch={watch}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default memo(DayTimeSlot);

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
