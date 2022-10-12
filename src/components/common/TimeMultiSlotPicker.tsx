import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from './text/TitleText';
import Colors from '../../constants/Colors';

// var x = 60; //minutes interval
// var times:
//   | {id: number; slot: string; active: boolean}[]
//   | (() => {id: number; slot: string; active: boolean}[]) = []; // time array
// var tt = 0; // start time

// //loop to increment the time and push results in array
// for (var i = 0; tt < 24 * 60; i++) {
//   var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format

//   var mm = tt % 60; // getting minutes of the hour in 0-55 format
//   times[i] = {
//     id: i + 1,
//     slot: ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2),
//     active: false,
//   }; // pushing data in array in [00:00 - 12:00 AM/PM format]
//   tt = tt + x;
// }
var x = 60; //minutes interval
var times:
  | {id: number; slot: string; active: boolean}[]
  | (() => {id: number; slot: string; active: boolean}[]) = [];
var tt = 0; // start time
var ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
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
  };
  tt = tt + x;
}
const TimeMultiSlotPicker = () => {
  const [newData, setDatas] = useState(times);
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
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleMultipleCheck(item.id)}
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
    paddingVertical: 8,
    marginRight: 10,
  },
  text: {
    color: Colors.text,
  },
});
