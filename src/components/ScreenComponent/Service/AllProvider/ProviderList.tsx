import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import ProviderInfo from './ProviderInfo';
import ProviderPricing from './ProviderPricing';
import Card from '../../../UI/Card';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
interface Props {
  item: any;
  onPress: () => void;
}

const ProviderList = ({item, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <Card
      style={{
        ...styles.container,
        backgroundColor: colors.backgroundColor,
      }}>
      <TouchableOpacity onPress={onPress} style={styles.providerContainer}>
        <ImageContainer provider={item?.provider} />
        <ProviderInfo
          rating={null}
          distance={item?.distance}
          nature={'na na a'}
          user={item?.provider?.user}
          availability={item?.availability}
          headline={
            item?.provider?.providerDetails &&
            item?.provider?.providerDetails?.headline
          }
          expYears={
            item?.provider?.providerDetails &&
            item?.provider?.providerDetails.yearsOfExperience
          }
          repeatClient={null}
        />
        <View style={styles.pricing}>
          <ProviderPricing provider={item?.provider} pricing={item?.ServiceHasRates} />
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
    borderRadius: 10,
  },
  providerContainer: {
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 15,
  },
  pricing: {position: 'absolute', right: 0, top: 0},
});
