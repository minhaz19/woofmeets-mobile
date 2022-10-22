import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppCheckbox from '../../../common/Form/AppCheckbox';
import TitleText from '../../../common/text/TitleText';
import ShortText from '../../../common/text/ShortText';
import Text_Size from '../../../../constants/textScaling';
const serviceData = [
  {
    serivce: 'Boarding',
    active: false,
    id: 0,
  },
  {
    serivce: 'House Sitting',
    active: false,
    id: 1,
  },
  {
    serivce: 'Drop-In Visits',
    active: false,
    id: 2,
  },
  {
    serivce: 'Doggy Day Care',
    active: false,
    id: 3,
  },
  {
    serivce: 'Dog Walking',
    active: false,
    id: 4,
  },
];
const ServiceSlot = () => {
  const [servcies, setServices] = useState<any>(serviceData);

  const handleOnChange = (id: number) => {
    const newHoliday = [...servcies];
    const index = newHoliday.findIndex(item => item.id === id);
    newHoliday[index].active = !newHoliday[index].active;
    setServices(newHoliday);
  };
  return (
    <View style={styles.parent}>
      {servcies.map((item: any, index: number) => (
        <View key={index} style={styles.container}>
          <View style={styles.serviceContainer}>
            <AppCheckbox
              active={item.active}
              radio
              onPress={() => handleOnChange(item.id)}
              Comp={() => (
                <View style={styles.textContainer}>
                  <TitleText textStyle={styles.title} text={item.serivce} />
                  <ShortText text={'0 of 5 booked '} />
                </View>
              )}
            />
          </View>
          <View>
            {item.active ? <TitleText text="Available" /> : <TitleText text="Unavailable" />}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ServiceSlot;

const styles = StyleSheet.create({
  parent: {width: '100%', padding: 10},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {fontWeight: 'bold', fontSize: Text_Size.Text_1},
});
