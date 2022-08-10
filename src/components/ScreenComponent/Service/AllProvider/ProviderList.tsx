import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import ProviderInfo from './ProviderInfo';
import ProviderPricing from './ProviderPricing';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  image: string;
  name: string;
  nature: string;
  rating: number;
  distance: string;
  availablity: string;
  pricing: string;
  repeatClient: string;
}

type StackParamList = {
  ProviderNavigator: {foo: string; onBar: () => void} | undefined;
};
type NavigationProps = StackNavigationProp<StackParamList>;
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
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProviderNavigator')}
      style={styles.providerContainer}>
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
    </TouchableOpacity>
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
