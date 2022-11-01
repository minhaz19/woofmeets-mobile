import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {petSizeType} from '../../../../../../../utils/config/Data/ProviderProfileDatas';
import ServicesCalendar from './component/ServicesCalendar';
import PetWeightType from './component/PetWeightType';
import PetPricing from './component/PetPricing';
import {useServices} from './utils/useServices';
interface useActiveIndex {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
}
const Services = (props) => {
  const {formattedServices, availabilityData, atHome} = useServices();
  const [activeIndex, setActiveIndex] = useState<useActiveIndex | any>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  console.log(formattedServices);
  return (
    <View style={styles.container}>
      <View style={styles.petTypeContainer}>
        {atHome !== null &&
          petSizeType?.map(
            (item, key) =>
              atHome[item.size] === true && (
                <PetWeightType key={key} item={item} />
              ),
          )}
      </View>

      <View style={styles.priceContainer}>
        {formattedServices?.map((pricingD: any, inde: number) => (
          <PetPricing
            key={inde}
            onPress={() => {
              const indexKey = Object.keys(activeIndex).map(item => ({
                i: item === inde.toString(),
              }));

              var modobject = indexKey.reduce(
                (obj, item, i) => Object.assign(obj, {[i]: item.i}),
                {},
              );
              setActiveIndex(modobject);
            }}
            pricingD={pricingD}
            showRate={activeIndex[inde]}
          />
        ))}
      </View>
      <View style={styles.calendar}>
        <ServicesCalendar availabilityData={availabilityData} providerOpk={props.providerOpk}/>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {},
  petTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  calendar: {
    marginTop: 10,
  },
  priceContainer: {marginVertical: 10},
});
