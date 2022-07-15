import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ServiceCare from '../common/ServiceCare';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import ServicePetType from '../common/ServicePetType';
import ServiceDays from '../common/ServiceDays';
import {dayOfWeek, time} from '../utils/petType';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import BottomButton from '../BottomButton';

const DoggyDayCare = () => {
  const [serviceType, setServiceType] = useState(1);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ServiceCare
          hText={'Doggy Day Care'}
          dText={'When do you need a walker?'}
          setServiceType={setServiceType}
          serviceType={serviceType}
        />
        <ServiceDates
          hText={'Dates'}
          setDatePicker={setDatePicker}
          setDate={setDate}
          datePicker={datePicker}
          date={date}
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
        <BottomSpacingNav />
      </ScrollView>
      <BottomButton title="Next" onSelect={() => {}} />
    </View>
  );
};

export default DoggyDayCare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
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