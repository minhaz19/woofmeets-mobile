/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, Pressable, View, Platform} from 'react-native';
import React, { useState } from 'react';
import TitleText from '../../../components/common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {Picker} from '@react-native-picker/picker';
import { useTheme } from '../../../constants/theme/hooks/useTheme';

interface Props {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  title: string;
  startName: string;
  endName: string;
  setValue?: any;
  setReportStartTime: any;
  setReportEndTime: any;
  reportStartTime: any;
  reportEndTime: any;
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
const ReportTimePicker = ({
  visible,
  setVisible,
  title,
  startName,
  endName,
  setReportStartTime,
  setReportEndTime,
  reportStartTime,
  reportEndTime,
  // setValue,
}: Props) => {
  // const [reportStartTime, setReportStartTime] = useState<string>(defaultFrom);
  // const [reportEndTime, setReportEndTime] = useState<string>(defaultTo);

  const {colors} = useTheme();
  const handleFrom = (itemValue: string) => {
    const findIndex = times.findIndex((item: string) => item === itemValue);
    if (findIndex !== -1 && findIndex !== times.length - 1) {
      setReportEndTime(times[findIndex + 1]);
      // setValue(endName, times[findIndex + 1]);
    } else if (findIndex === times.length - 1) {
      setReportEndTime(times[0]);
      // setValue(endName, times[0]);
    }
    // setValue(startName, itemValue);
    setReportStartTime(itemValue);
  };
  const handleTo = (itemValue: string) => {
    const startIndex = times.findIndex((item: string) => item === reportStartTime);
    const endIndex = times.findIndex((item: string) => item === itemValue);
    if (startIndex >= endIndex && endIndex !== 0) {
      setReportStartTime(times[endIndex - 1]);
      // setValue(startName, times[endIndex - 1]);
    } else if (endIndex === 0) {
      setReportStartTime(times[times.length - 1]);
      // setValue(startName, times[times.length]);
    }
    // setValue(endName, itemValue);
    setReportEndTime(itemValue);
  };
  return (
    <View>
      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable style={styles.container} onPress={() => setVisible(false)} />

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

        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <View style={styles.halfCont}>
            <TitleText text={'Start'} textStyle={styles.title} />
            <Picker
              selectedValue={reportStartTime}
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
            <TitleText text={'End'} textStyle={styles.title} />
            <Picker
              selectedValue={reportEndTime}
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

export default ReportTimePicker;

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
