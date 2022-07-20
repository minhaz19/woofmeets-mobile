/* eslint-disable prettier/prettier */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ServiceHeader from '../common/ServiceHeader';
import ServiceLocation from '../common/ServiceLocation';
import {petType} from '../utils/petType';
import ServicePetType from '../common/ServicePetType';
import Text_Size from '../../../../constants/textScaling';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import BottomButton from '../BottomButton';
import HeaderText from '../../../common/text/HeaderText';
import ServiceDate from '../common/ServiceDate';

const Boarding = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ServiceHeader hText={'Boarding'} dText={'When do you need sitter?'} />
        <ServiceDate hText="Dates" />
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
    marginTop: 20,
    fontSize: Text_Size.Text_9,
  },
});
