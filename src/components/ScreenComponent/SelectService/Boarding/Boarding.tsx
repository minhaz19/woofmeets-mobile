import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ServiceHeader from '../common/ServiceHeader';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';

const Boarding = () => {
  return (
    <View style={styles.container}>
      <ServiceHeader hText={'Boarding'} dText={'When do you need sitter?'} />
      <ServiceDates hText={'Dates'} />
      <ServiceLocation
        hText={'Location'}
        dText={'Enter a date to find someone faster'}
      />
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
