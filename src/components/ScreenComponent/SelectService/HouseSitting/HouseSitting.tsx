import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ServiceHeader from '../common/ServiceHeader';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import ServicePetType from '../common/ServicePetType';
import {petType} from '../utils/petType';
import Text_Size from '../../../../constants/textScaling';
import BottomButton from '../BottomButton';
import HeaderText from '../../../common/text/HeaderText';

const HouseSitting = () => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ServiceHeader
          hText={'House Sitting'}
          dText={'When do you need sitter?'}
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
        <HeaderText textStyle={styles.text} text={'Pet Type (s)'} />
        <View style={styles.petTypeContainer}>
          {petType.map((item, index) => {
            return <ServicePetType key={index} title={item.type} radio />;
          })}
        </View>
      </ScrollView>
      <BottomButton title="Next" onSelect={() => {}} />
    </View>
  );
};

export default HouseSitting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '10%',
  },
  petTypeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontSize: Text_Size.Text_9,
    marginTop: 20,
  },
});
