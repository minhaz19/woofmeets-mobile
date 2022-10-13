import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import TitleText from './text/TitleText';
import Colors from '../../constants/Colors';
import {useFormContext} from 'react-hook-form';

// function generate_series(step: number = 60) {
var x = 60; //minutes interval
var times: any = []; // time array
var tt = 0; // start time
var ap = ['AM', 'PM']; // AM-PM

for (var i = 0; tt < 24 * 60; i++) {
  var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  var mm = tt % 60; // getting minutes of the hour in 0-55 format
  times[i] = {
    id: i + 1,

    slot:
      ('0' + (hh % 12)).slice(-2) +
      ':' +
      ('0' + mm).slice(-2) +
      ap[Math.floor(hh / 12)],
    active: false,
  }; // pushing data in array in [00:00 - 12:00 AM/PM format]
  tt = tt + x;
}
// return times;
// }
var Dates: any = [];
const TimeMultiSlotPicker = (date: any) => {
  // const {visitLength} = useWatch();
  const {setValue} = useFormContext();
  const [newData, setDatas] = useState<any>(times);
  // useMemo(() => {
  //   // const times = generate_series(visitLength);
  //   // const times = generate_series(visitLength);
  //   times && setDatas(times);
  // }, [visitLength]);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
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
                (it: {date: string}) => it.date === date.date,
              );

              if (matchDate === -1) {
                Dates.push({
                  date: date.date,
                  visitTime: [item.slot],
                });
              } else {
                const found = Dates.filter(
                  (obj: any) => obj.date === date.date,
                );

                const matchIndex = found[0].visitTime?.findIndex(
                  (it: {visitTime: string}) => it === item.slot,
                );
                if (matchIndex === -1) {
                  found[0].visitTime.push(item.slot);
                } else {
                  found[0].visitTime.splice(matchIndex, 1);
                }
                setValue('DIVspecificDates', Dates);
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
            <TitleText text={item.slot} textStyle={styles.text} />
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
    paddingVertical: 8,
    marginRight: 10,
  },
  text: {
    color: Colors.text,
  },
});
