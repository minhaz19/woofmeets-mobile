/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ServiceHeader from '../common/ServiceHeader';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import {petType} from '../utils/petType';
import ServicePetType from '../common/ServicePetType';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import BottomButton from '../BottomButton';

const Boarding = () => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <ServiceHeader hText={'Boarding'} dText={'When do you need sitter?'} />
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
      <Text style={[styles.text, {color: colors.headerText}]}>
        Pet Type (s)
      </Text>
      <View style={styles.petTypeContainer}>
        {petType.map((item, index) => {
          return <ServicePetType key={index} title={item.type} radio />;
        })}
      </View>
      <BottomSpacingNav />
      </ScrollView>
      <BottomButton title="Next" onSelect={() => {}} />
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
  },
  petTypeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontSize: Text_Size.Text_1,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
