import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import TitleText from './text/TitleText';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import {useFormContext} from 'react-hook-form';
interface Props {
  visible: boolean;
  setVisbile: (arg: boolean) => void;
  title: string;
  startName: string;
  endName: string;
}
// var x = 60; //minutes interval
// var times: any = []; // time array
// var tt = 0; // start time

// //loop to increment the time and push results in array
// for (var i = 0; tt < 24 * 60; i++) {
//   var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format

//   var mm = tt % 60; // getting minutes of the hour in 0-55 format
//   times[i] = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
//   tt = tt + x;
// }
var x = 60; //minutes interval
var times: any = [];
var tt = 0; // start time
var ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
for (var i = 0; tt < 24 * 60; i++) {
  var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  var mm = tt % 60; // getting minutes of the hour in 0-55 format
  times[i] =
    ('0' + (hh % 12)).slice(-2) +
    ':' +
    ('0' + mm).slice(-2) +
    ap[Math.floor(hh / 12)];
  tt = tt + x;
}
const TimeSlotPicker = ({
  visible,
  setVisbile,
  title,
  startName,
  endName,
}: Props) => {
  const [fromTime, setFromTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  const {setValue} = useFormContext();
  useMemo(() => {
    setValue(startName, fromTime);
    setValue(endName, toTime);
  }, [endName, fromTime, setValue, startName, toTime]);
  return (
    <View>
      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable style={styles.container} onPress={() => setVisbile(false)} />
        <TitleText text={title} textStyle={styles.headerText} />
        <View style={styles.pickerContainer}>
          <View style={styles.halfCont}>
            <TitleText text={'From'} textStyle={styles.title} />
            <Picker
              selectedValue={fromTime}
              onValueChange={itemValue => setFromTime(itemValue)}>
              {times.map((item: string, index: number) => (
                <Picker.Item value={item} label={item.toString()} key={index} />
              ))}
            </Picker>
          </View>
          <View style={styles.halfCont}>
            <TitleText text={'To'} textStyle={styles.title} />
            <Picker
              selectedValue={toTime}
              onValueChange={itemValue => setToTime(itemValue)}>
              {times.map((item: string, index: number) => (
                <Picker.Item value={item} label={item.toString()} key={index} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimeSlotPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  pickerContainer: {
    height: 250,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  halfCont: {width: '50%'},
  label: {
    textTransform: 'capitalize',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
  },
});
