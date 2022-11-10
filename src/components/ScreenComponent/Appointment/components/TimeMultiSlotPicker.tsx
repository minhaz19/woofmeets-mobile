/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {useTimeMultiSlotPicker} from './utils/useTimeMultiSlotPicker';

// let Dates: any = [];
const TimeMultiSlotPicker = ({
  isRecurring,
  singleItem,
  initalSlot,
  setValue,
  watch,
}: any) => {
  // const {setValue} = useFormContext();
  const {handleMultipleCheck, newData, Dates, Days} = useTimeMultiSlotPicker(
    singleItem,
    initalSlot,
    isRecurring,
    watch,
  );
  console.log('new Data', newData);
  return (
    <View style={styles.container}>
      <TitleText textStyle={{}} text={''} />
      <FlatList
        data={newData}
        horizontal
        keyExtractor={(item, index) => (item.slot + index).toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              if (isRecurring) {
                const matchDate = Days.findIndex(
                  (dd: {date: string}) => dd.date === singleItem.date,
                );

                if (matchDate === -1) {
                  Days.push({
                    date: singleItem.date,
                    visits: [item.slot],
                  });
                  handleMultipleCheck(item.id);
                } else {
                  const found = Days.filter(
                    (obj: any) => obj.date === singleItem.date,
                  );

                  const matchIndex = found[0].visits?.findIndex(
                    (it: {visits: string}) => it === item.slot,
                  );
                  if (matchIndex === -1) {
                    if (Days[matchDate]?.visits?.length > 9) {
                      Alert.alert('You can only select 10 time slots');
                      return;
                    }
                    handleMultipleCheck(item.id);
                    found[0].visits.push(item.slot);
                  } else {
                    found[0].visits.splice(matchIndex, 1);
                    handleMultipleCheck(item.id);
                  }
                }
                setValue('recurringModDates', Days);
              } else if (!isRecurring) {
                console.log('Date', Dates);
                const matchDate = Dates?.findIndex(
                  (it: {date: string}) => it.date === singleItem.date,
                );

                if (matchDate === -1) {
                  Dates.push({
                    date: singleItem.date,
                    visits: [item.slot],
                  });
                  handleMultipleCheck(item.id);
                } else {
                  const found = Dates.filter(
                    (obj: any) => obj.date === singleItem.date,
                  );
                  const matchIndex = found[0].visits?.findIndex(
                    (it: {visits: string}) => it === item.slot,
                  );
                  if (matchIndex === -1) {
                    if (Dates[matchDate]?.visits?.length > 9) {
                      Alert.alert('You can only select 10 time slots');
                      return;
                    }
                    found[0].visits.push(item.slot);
                    handleMultipleCheck(item.id);
                  } else {
                    found[0].visits.splice(matchIndex, 1);
                    handleMultipleCheck(item.id);
                  }
                }
                setValue('specificModDates', Dates);
              }
            }}
            style={[
              styles.slots,
              {
                backgroundColor: item.active
                  ? Colors.primary
                  : Colors.background,
              },
            ]}>
            <TitleText
              text={item.slot}
              textStyle={{
                color: item.active ? Colors.background : Colors.text,
                fontWeight: 'bold',
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default memo(TimeMultiSlotPicker);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  slots: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
  text: {},
});
