import {StyleSheet, View} from 'react-native';
import React from 'react';
import ImageContainer from '../../../AllProvider/ImageContainer';
import ProviderInfo from '../../../AllProvider/ProviderInfo';
import {useAppSelector} from '../../../../../../store/store';

const ProviderProfileInfo = () => {
  const {profileInfo} = useAppSelector(state => state.providerProfile);
  return (
    <View style={styles.container}>
      <ImageContainer image={profileInfo?.avatar.url} rounded />
      <View style={styles.infoContainer}>
        <ProviderInfo
          name={`${profileInfo?.firstName + ' ' + profileInfo?.lastName}`}
          nature="Caring and attentive animal lover"
          rating={profileInfo?.rating ? profileInfo?.rating : 0}
          distance={`${
            profileInfo?.address?.addressLine1 +
            ' ' +
            profileInfo?.address?.city
            // ' ' +
            // profileInfo?.address?.state
          }`}
        />
      </View>
    </View>
  );
};

export default ProviderProfileInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'center',
  },
});
