/* eslint-disable react-native/no-inline-styles */
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {useFormContext} from 'react-hook-form';
import {useTimeMultiSlotPicker} from './utils/useTimeMultiSlotPicker';

// let Dates: any = [];
const TimeMultiSlotPicker = ({isRecurring, singleItem, initalSlot}: any) => {
  const {setValue} = useFormContext();
  const {handleMultipleCheck, newData, Dates, Days} = useTimeMultiSlotPicker(
    singleItem,
    initalSlot,
    isRecurring,
  );
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
              handleMultipleCheck(item.id);

              if (isRecurring) {
                const matchDate = Days?.findIndex(
                  (it: {date: string}) => it.date === singleItem.date,
                );
                if (matchDate === -1) {
                  Days.push({
                    date: singleItem.date,
                    visitTime: [item.slot],
                    sameAsStartDate: false,
                    startDate:
                      matchDate === -1 && Days.length === 0 ? true : false,
                  });
                } else {
                  const found = Days.filter(
                    (obj: any) => obj.date === singleItem.date,
                  );

                  const matchIndex = found[0].visitTime?.findIndex(
                    (it: {visitTime: string}) => it === item.slot,
                  );
                  if (matchIndex === -1) {
                    found[0].visitTime.push(item.slot);
                  } else {
                    found[0].visitTime.splice(matchIndex, 1);
                  }
                }

                setValue('recurringModDatesRef', Days);
              } else if (!isRecurring) {
                const matchDate = Dates?.findIndex(
                  (it: {date: string}) => it.date === singleItem.date,
                );
                console.log('matched date', matchDate);
                if (matchDate === -1) {
                  Dates.push({
                    date: singleItem.date,
                    visitTime: [item.slot],
                    sameAsStartDate: false,
                    startDate:
                      matchDate === -1 && Dates.length === 0 ? true : false,
                  });
                } else {
                  const found = Dates.filter(
                    (obj: any) => obj.date === singleItem.date,
                  );
                  console.log('fount', found);
                  const matchIndex = found[0].visitTime?.findIndex(
                    (it: {visitTime: string}) => it === item.slot,
                  );
                  if (matchIndex === -1) {
                    found[0].visitTime.push(item.slot);
                  } else {
                    found[0].visitTime.splice(matchIndex, 1);
                  }
                }
                console.log('time slot', Dates);
                setValue('specificModDatesRef', Dates);
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

export default TimeMultiSlotPicker;

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
