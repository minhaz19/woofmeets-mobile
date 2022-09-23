import {StyleSheet, View} from 'react-native';
import React from 'react';
import {petSizeType} from '../../../../../../../utils/config/Data/ProviderProfileDatas';
import ServicesCalendar from './component/ServicesCalendar';
import PetWeightType from './component/PetWeightType';
import PetPricing from './component/PetPricing';
import {useServices} from './utils/useServices';

const Services = () => {
  const {formattedServices, availabilityData, atHome} = useServices();
  return (
    <View style={styles.container}>
      <View style={styles.petTypeContainer}>
        {petSizeType.map(
          (item, key) =>
            atHome[item.size] === true && (
              <PetWeightType key={key} item={item} />
            ),
        )}
      </View>

      <View>
        {formattedServices?.map((pricingD: any, inde: number) => (
          <PetPricing key={inde} pricingD={pricingD} />
        ))}
      </View>
      <View style={styles.calendar}>
        <ServicesCalendar availabilityData={availabilityData} />
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
