/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {useTimeMultiSlotPicker} from './utils/useTimeMultiSlotPicker';

const TimeMultiSlotPicker = ({
  isRecurring,
  singleItem,
  visits,
  setValue,
}: any) => {
  const {handleMultipleCheck, times, Dates, Days} = useTimeMultiSlotPicker(
    singleItem,
    visits,
  );
  return (
    <View style={styles.container}>
      <TitleText textStyle={{}} text={''} />
      <FlatList
        data={times}
        horizontal
        keyExtractor={(item, index) => (item.slot + index).toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Pressable
              disabled={item.disable}
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
                      } else {
                        handleMultipleCheck(item.id);
                        found[0].visits.push(item.slot);
                      }
                    } else {
                      found[0].visits.splice(matchIndex, 1);
                      handleMultipleCheck(item.id);
                    }
                  }

                  setValue('recurringModDates', Days);
                } else if (!isRecurring) {
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
                    const found = Dates[matchDate];
                    const matchIndex = found.visits.findIndex(
                      (it: {visits: string}) => it === item.slot,
                    );

                    if (matchIndex === -1) {
                      if (Dates[matchDate].visits?.length > 9) {
                        Alert.alert('You can only select 10 time slots');
                        return;
                      } else {
                        found.visits.push(item.slot);
                        handleMultipleCheck(item.id);
                      }
                    } else {
                      handleMultipleCheck(item.id);
                      found.visits.splice(matchIndex, 1);
                    }
                  }

                  setValue('specificModDates', Dates);
                }
              }}
              style={[
                styles.slots,
                {
                  backgroundColor: item.disable
                    ? Colors.iosBG
                    : item.active
                    ? Colors.primary
                    : Colors.background,
                },
              ]}>
              <TitleText
                text={item.slot}
                textStyle={{
                  color: item.disable
                    ? Colors.gray
                    : item.active
                    ? Colors.background
                    : Colors.text,
                  fontWeight: 'bold',
                }}
              />
            </Pressable>
          );
        }}
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
