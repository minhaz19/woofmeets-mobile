import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ServiceCare from '../common/ServiceCare';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import ServicePetType from '../common/ServicePetType';
import ServiceDays from '../common/ServiceDays';
import {dayOfWeek, time} from '../utils/petType';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

const DoggyDayCare = () => {
  const [serviceType, setServiceType] = useState(1);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const {colors} = useTheme();
  function showDatePicker() {
    setDatePicker(true);

    console.log('showDatePickerClicked');
  }

  function onDateSelected(_event: DateTimePickerEvent, value?: any) {
    setDate(value);
    setDatePicker(false);
    console.log('onDateSelectedClicked', _event, value);
  }

  return (
    <View style={[styles.container]}>
      <ServiceCare
        hText={'Doggy Day Care'}
        dText={'When do you need a walker?'}
        setServiceType={setServiceType}
        serviceType={serviceType}
      />
      <ServiceDates
        hText={'Dates'}
        showDatePicker={showDatePicker}
        onDateSelected={onDateSelected}
        datePicker={datePicker}
        date={date}
      />
      <ServiceLocation
        hText={'Location'}
        dText={'Enter a date to find someone faster'}
      />
      <Text style={[styles.text, {color: colors.headerText}]}>Time</Text>
      <View style={styles.timeContainer}>
        {time.map((item, index) => {
          return <ServicePetType key={index} title={item.time} radio />;
        })}
      </View>
      {serviceType === 2 && (
        <>
          <Text style={[styles.text, {color: colors.headerText}]}>
            Days of the week
          </Text>

          <View style={styles.dayBoxContainer}>
            {dayOfWeek.map((item, index) => {
              return <ServiceDays key={index} title={item.day} />;
            })}
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <ButtonCom
          title={'Next'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
    </View>
  );
};

export default DoggyDayCare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    top: '10%',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: Text_Size.Text_1,
    marginTop: 20,
    fontWeight: 'bold',
  },
  dayBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});
