import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImageContainer from './ImageContainer';
import ProviderInfo from './ProviderInfo';
import ProviderPricing from './ProviderPricing';
import Card from '../../../UI/Card';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
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
        // paddingHorizontal: 10,
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
          {item?.provider?.badgeProviders?.length > 0 ? (
            <View style={styles.ImageContainer}>
              <AppTouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Certified!',
                    item?.provider?.badgeProviders?.[0]?.badge?.description,
                  )
                }>
                <Image
                  source={{
                    uri: item?.provider?.badgeProviders?.[0]?.badge?.icon
                      ?.Location,
                  }}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              </AppTouchableOpacity>
              <AppTouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Verified!',
                    item?.provider?.badgeProviders?.[1]?.badge?.description,
                  )
                }>
                <Image
                  source={{
                    uri: item?.provider?.badgeProviders?.[1]?.badge?.image
                      ?.Location,
                  }}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              </AppTouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          <ProviderPricing
            provider={item?.provider}
            pricing={item?.ServiceHasRates}
          />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  providerContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    marginVertical: 15,
  },
  pricing: {
    height: '100%',
    justifyContent: 'space-between',
  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
});
