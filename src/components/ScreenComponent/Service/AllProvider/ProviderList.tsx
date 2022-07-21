import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import ProviderInfo from './ProviderInfo';
import ProviderPricing from './ProviderPricing';
interface Props {
  image: any;
  name: string;
  nature: string;
  rating: number;
  distance: string;
  availablity: string;
  pricing: string;
  repeatClient: string;
}
const ProviderList = ({
  image,
  name,
  nature,
  rating,
  distance,
  availablity,
  repeatClient,
  pricing,
}: Props) => {
  return (
    <View style={styles.providerContainer}>
      <ImageContainer image={image} />
      <ProviderInfo
        rating={rating}
        distance={distance}
        nature={nature}
        name={name}
        availablity={availablity}
        repeatClient={repeatClient}
      />
      <View style={styles.pricing}>
        <ProviderPricing pricing={pricing} />
      </View>
    </View>
  );
};

export default ProviderList;

const styles = StyleSheet.create({
  providerContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 15,
  },
  pricing: {position: 'absolute', right: 0, top: 0},
});
