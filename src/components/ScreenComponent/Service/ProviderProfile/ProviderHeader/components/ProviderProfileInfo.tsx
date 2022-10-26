import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../../../../store/store';
import ProviderImageContainer from './ProviderImageContainer';
import ProviderBio from './ProviderBio';

const ProviderProfileInfo = () => {
  const {profileInfo} = useAppSelector(state => state.providerProfile);
  return (
    <View style={styles.container}>
      <ProviderImageContainer image={profileInfo?.avatar?.url} />
      <View style={styles.infoContainer}>
        <ProviderBio
          name={`${profileInfo?.firstName + ' ' + profileInfo?.lastName}`}
          rating={profileInfo?.rating ? profileInfo?.rating : 0}
          distance={`${
            profileInfo?.address !== null
              ? profileInfo?.address?.state +
                ', ' +
                profileInfo?.address?.country.name
              : ''
          }`}
        />
      </View>
    </View>
  );
};

export default ProviderProfileInfo;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
