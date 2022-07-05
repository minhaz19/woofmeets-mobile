/* eslint-disable prettier/prettier */
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface Props {
  hText: string;
}

const ServiceDates: FC<Props> = ({hText}) => {
  const colors = useTheme();
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event: DateTimePickerEvent, value?: any) {
    setDate(value);
    setDatePicker(false);
  }

  return (
    <View>
      <Text style={[styles.header, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <Pressable onPress={showDatePicker}>
        <View pointerEvents="none">
          <TextInput
            style={[styles.input, {backgroundColor: colors.colors.backgroundColor}]}
            value={date.toDateString()}
            placeholder="Enter your location"
          />
        </View>
      </Pressable>
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}

      {/* {!datePicker && (
          <View style={{margin: 10}}>
            <Button
              title="Show Date Picker"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        )} */}
    </View>
  );
};

export default ServiceDates;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
