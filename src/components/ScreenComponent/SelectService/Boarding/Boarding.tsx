/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ServiceHeader from '../common/ServiceHeader';
import ServiceDates from '../common/ServiceDates';
import ServiceLocation from '../common/ServiceLocation';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {petType} from '../utils/petType';
import ServicePetType from '../common/ServicePetType';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';

const Boarding = () => {
  const {colors} = useTheme();
  console.log(SCREEN_HEIGHT);
  return (
    <View style={styles.container}>
      <ServiceHeader hText={'Boarding'} dText={'When do you need sitter?'} />
      <ServiceDates hText={'Dates'} />
      <ServiceLocation
        hText={'Location'}
        dText={'Enter a date to find someone faster'}
      />
      <Text style={[styles.text, {color: colors.headerText}]}>
        Pet Type (S)
      </Text>
      <View style={styles.petTypeContainer}>
        {petType.map((item, index) => {
          return <ServicePetType key={index} title={item.type} radio />;
        })}
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCom
          title={'Search'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    top: '40%',
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
