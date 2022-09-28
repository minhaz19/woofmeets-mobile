import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import ProviderInfo from './ProviderInfo';
import ProviderPricing from './ProviderPricing';
import Card from '../../../UI/Card';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';
interface Props {
  image: string;
  name: string;
  nature: string;
  rating: number;
  distance: string;
  availablity: string;
  pricing: string;
  repeatClient: string;
  onPress: () => void;
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
  onPress,
}: Props) => {
  const {isDarkMode, colors} = useTheme();
  return (
    <Card style={{...styles.container, backgroundColor: isDarkMode
      ? colors.lightBackgroundColor
      : colors.backgroundColor}}>
    <TouchableOpacity onPress={onPress} style={styles.providerContainer}>
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
    </Card>
  );
};

export default ProviderList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 5,
  },
  providerContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 15,
  },
  pricing: {position: 'absolute', right: 0, top: 0},
});
