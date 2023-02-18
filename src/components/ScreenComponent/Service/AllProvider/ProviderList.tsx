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
    <View style={styles.cardWarpper}>
      <Card
        style={{
          ...styles.container,
          backgroundColor: colors.backgroundColor,
        }}>
        <TouchableOpacity onPress={onPress} style={styles.touchContainer}>
          <ImageContainer provider={item?.provider} />
          <View style={styles.providerContainer}>
            <ProviderInfo
              rating={null}
              distance={item?.distance}
              nature={'na na a'}
              user={item?.provider?.user}
              provider={item?.provider}
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
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default ProviderList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  touchContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    flex: 1,
  },
  providerContainer: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1,
    marginVertical: 15,
  },
  pricing: {
    justifyContent: 'space-between',

    marginRight: 8,
  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  cardWarpper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
