/* eslint-disable react-native/no-inline-styles */
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {useFormContext} from 'react-hook-form';
import {useTimeMultiSlotPicker} from './utils/useTimeMultiSlotPicker';

let Dates: any = [];
const TimeMultiSlotPicker = ({isRecurring, singleItem, initalSlot}: any) => {
  const {setValue} = useFormContext();
  const {handleMultipleCheck, newData} = useTimeMultiSlotPicker(
    singleItem,
    initalSlot,
  );
  // const {visitLength} = useWatch();

  // const {setValue} = useFormContext();

  // const [newData, setDatas] = useState<any>([]);
  // useMemo(() => {
  //   console.log('reloading day time slo');
  //   const times: any = []; // time array
  //   let tt = 0; // start time
  //   const ap = ['AM', 'PM']; // AM-PM
  //   console.log('ind lop', initalSlot);

  //   for (let i = 0; tt < 24 * 60; i++) {
  //     console.log('ind lop');
  //     const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  //     const mm = tt % 60; // getting minutes of the hour in 0-55 format
  //     const individualSlot =
  //       ('0' + (hh % 12)).slice(-2) +
  //       ':' +
  //       ('0' + mm).slice(-2) +
  //       ap[Math.floor(hh / 12)];
  //     times[i] = {
  //       id: i + 1,
  //       slot: individualSlot,
  //       active: initalSlot
  //         ? initalSlot?.some((it: string) => it === individualSlot)
  //         : false,
  //     }; // pushing data in array in [00:00 - 12:00 AM/PM format]
  //     tt = tt + visitLength;
  //   }
  //   setDatas(times);
  // }, [initalSlot, visitLength]);

  // console.log('rel it timeslot', isRecurring);

  // console.log('calling');
  // const handleMultipleCheck = (id: number) => {
  //   console.log('reloading day time slo');
  //   const newArray = [...newData];
  //   const index = newArray.findIndex(item => item.id === id);
  //   newArray[index].active = !newArray[index].active;
  //   setDatas(newArray);
  // };
  // if (initalSlot?.length > 0) {
  //   const matchIndex = Dates.findIndex(
  //     (itm: {date: string}) => itm.date === singleItem.date,
  //   );
  //   if (matchIndex === -1) {
  //     Dates.push({
  //       date: singleItem.date,
  //       visitTime: initalSlot,
  //       sameAsStartDate: false,
  //       startDate: singleItem.startDate,
  //     });
  //   }
  // }
  // console.log('Dates', Dates);
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

              const matchDate = Dates?.findIndex(
                (it: {date: string}) => it.date === singleItem.date,
              );
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

                const matchIndex = found[0].visitTime?.findIndex(
                  (it: {visitTime: string}) => it === item.slot,
                );
                if (matchIndex === -1) {
                  found[0].visitTime.push(item.slot);
                } else {
                  found[0].visitTime.splice(matchIndex, 1);
                }
              }
              isRecurring && setValue('recurringModDatesRef', Dates);
              !isRecurring && setValue('specificModDates', Dates);
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
