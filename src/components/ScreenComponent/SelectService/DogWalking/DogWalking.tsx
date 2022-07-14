import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ServiceCare from '../common/ServiceCare';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import ServicePetType from '../common/ServicePetType';
import {dayOfWeek, time} from '../utils/petType';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';
import ServiceDays from '../common/ServiceDays';

const DogWalking = () => {
  const [serviceType, setServiceType] = useState(1);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const {colors} = useTheme();
  return (
    <View style={[styles.container]}>
      <ServiceCare
        hText={'Dog Walking'}
        dText={'When do you need a walker?'}
        setServiceType={setServiceType}
        serviceType={serviceType}
      />
      <ServiceDates
        hText={'Dates'}
        datePicker={datePicker}
        date={date}
        setDatePicker={setDatePicker}
        setDate={setDate}
      />
      <ServiceLocation
        hText={'Your location'}
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

export default DogWalking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '10%',
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
