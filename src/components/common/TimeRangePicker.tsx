import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
interface Props {
  visible: boolean;
  setVisbile: (arg: boolean) => void;
}
const TimeSlotPicker = ({visible, setVisbile}: Props) => {
  const [pickerValue, setPickerValue] = useState<string>('');
  return (
    <View>
      <Modal animated transparent visible={visible} animationType="fade">
        {/* <View> */}
        {/* <View style={styles.header}>
            <Pressable>
              <TitleText text={'Save'} />
            </Pressable>
          </View> */}
        <Pressable style={styles.container} onPress={() => setVisbile(false)} />
        <View style={styles.pickerContainer}>
          {/* <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}> */}
          <View style={styles.halfCont}>
            <Picker
              selectedValue={pickerValue}
              onValueChange={itemValue => setPickerValue(itemValue)}>
              {[10, 30, 32, 34, 34, 34, 34, 34, 34, 34].map(item => (
                <Picker.Item value={item} label={item.toString()} />
              ))}
            </Picker>
          </View>
          <View style={styles.halfCont}>
            <Picker
              selectedValue={pickerValue}
              onValueChange={itemValue => setPickerValue(itemValue)}>
              {[10, 30, 32, 34, 34, 34, 34, 34, 34, 34].map(item => (
                <Picker.Item value={item} label={item.toString()} />
              ))}
            </Picker>
          </View>
        </View>
        {/* </View> */}
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
  pickerContainer: {
    height: 200,
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
});
