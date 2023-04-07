/* eslint-disable react-native/no-inline-styles */
import {Modal, Platform, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import TitleText from './text/TitleText';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import {useTheme} from '../../constants/theme/hooks/useTheme';
interface Props {
  visible: boolean;
  setVisbile: (arg: boolean) => void;
  title: string;
  startName: string;
  endName: string;
  defaultFrom: string;
  defaultTo: string;
  setValue: any;
}

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
  defaultFrom,
  defaultTo,
  setValue,
}: Props) => {
  const [fromTime, setFromTime] = useState<string>(defaultFrom);
  const [toTime, setToTime] = useState<string>(defaultTo);

  const {colors} = useTheme();
  const handleFrom = (itemValue: string) => {
    const findIndex = times.findIndex((item: string) => item === itemValue);
    if (findIndex !== -1 && findIndex !== times.length - 1) {
      setToTime(times[findIndex + 1]);
      setValue(endName, times[findIndex + 1]);
    } else if (findIndex === times.length - 1) {
      setToTime(times[0]);
      setValue(endName, times[0]);
    }
    setValue(startName, itemValue);
    setFromTime(itemValue);
  };
  const handleTo = (itemValue: string) => {
    const startIndex = times.findIndex((item: string) => item === fromTime);
    const endIndex = times.findIndex((item: string) => item === itemValue);
    if (startIndex >= endIndex && endIndex !== 0) {
      setFromTime(times[endIndex - 1]);
      setValue(startName, times[endIndex - 1]);
    } else if (endIndex === 0) {
      setFromTime(times[times.length - 1]);
      setValue(startName, times[times.length]);
    }
    setValue(endName, itemValue);
    setToTime(itemValue);
  };

  return (
    <View>
      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable style={styles.container} onPress={() => setVisbile(false)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Colors.background,
          }}>
          <TitleText
            text={title}
            textStyle={{
              borderTopColor: Colors.primary,
              borderTopWidth: 2,
              fontWeight: 'bold',
              fontSize: Text_Size.Text_1,
              padding: 20,
              backgroundColor: colors.backgroundColor,
            }}
          />
          <Pressable onPress={() => setVisbile(false)}>
            <TitleText
              text={'Close'}
              textStyle={{
                color: Colors.primaryDif,
                fontWeight: 'bold',
                fontSize: Text_Size.Text_1,
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <View style={styles.halfCont}>
            <TitleText text={'From'} textStyle={styles.title} />
            <Picker
              selectedValue={fromTime}
              onValueChange={handleFrom}
              dropdownIconColor={Colors.black}
              style={{
                color: Colors.black,
              }}>
              {times.map((item: string, index: number) => (
                <Picker.Item value={item} label={item.toString()} key={index} />
              ))}
            </Picker>
          </View>
          <View style={styles.halfCont}>
            <TitleText text={'To'} textStyle={styles.title} />
            <Picker
              selectedValue={toTime}
              onValueChange={handleTo}
              dropdownIconColor={Colors.black}
              style={{
                color: Colors.black,
              }}>
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

export default memo(TimeSlotPicker);

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
    height: Platform.OS === 'ios' ? 250 : 150,
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
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginLeft: 10,
  },
});
