import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {serivesData} from '../../../../../../../utils/config/Data/ProviderProfileDatas';
import ServicesCalendar from './component/ServicesCalendar';
import PetWeightType from './component/PetWeightType';
import PetPricing from './component/PetPricing';

const Services = () => {
  const [activeDog, setActiveDog] = useState(0);
  return (
    <View style={styles.container}>
      {serivesData.map((d, index) => (
        <View key={index}>
          <View style={styles.petTypeContainer}>
            {d.petType.map((item, key) => (
              <PetWeightType
                key={key}
                item={item}
                activeDog={activeDog}
                setActiveDog={setActiveDog}
              />
            ))}
          </View>

          <View>
            {d.petPricing.map((pricingD, inde) => (
              //@ts-ignore
              <PetPricing key={inde} pricingD={pricingD} />
            ))}
          </View>
        </View>
      ))}
      <View style={styles.calendar}>
        <ServicesCalendar />
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {},
  petTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  calendar: {
    marginTop: 10,
  },
});
