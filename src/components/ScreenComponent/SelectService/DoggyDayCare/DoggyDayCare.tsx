import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ServiceCare from '../common/ServiceCare';
import ServiceLocation from '../common/ServiceLocation';
import ServicePetType from '../common/ServicePetType';
import ServiceDays from '../common/ServiceDays';
import {dayOfWeek, time} from '../utils/petType';
import Text_Size from '../../../../constants/textScaling';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import BottomButton from '../BottomButton';
import HeaderText from '../../../common/text/HeaderText';
import ServiceDate from '../common/ServiceDate';

const DoggyDayCare = () => {
  const [serviceType, setServiceType] = useState(1);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ServiceCare
          hText={'Doggy Day Care'}
          dText={'When do you need a walker?'}
          setServiceType={setServiceType}
          serviceType={serviceType}
        />
        <ServiceDate hText="Dates" />
        <ServiceLocation
          hText={'Your location'}
          dText={'Enter a date to find someone faster'}
        />
        <HeaderText textStyle={styles.text} text={'Time'} />
        <View style={styles.timeContainer}>
          {time.map((item, index) => {
            return <ServicePetType key={index} title={item.time} radio />;
          })}
        </View>
        {serviceType === 2 && (
          <>
            <HeaderText textStyle={styles.text} text={'Days of the week'} />
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
    fontSize: Text_Size.Text_9,
    marginTop: 20,
  },
  dayBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});
