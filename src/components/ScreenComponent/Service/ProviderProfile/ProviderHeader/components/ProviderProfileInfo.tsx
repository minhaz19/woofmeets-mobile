import {Alert, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../../../../store/store';
import ProviderImageContainer from './ProviderImageContainer';
import ProviderBio from './ProviderBio';
import Colors from '../../../../../../constants/Colors';
import AppTouchableOpacity from '../../../../../common/AppClickEvents/AppTouchableOpacity';

const ProviderProfileInfo = () => {
  const {profileInfo} = useAppSelector(state => state.providerProfile);
  return (
    <AppTouchableOpacity
      style={styles.container}
      onPress={() =>
        profileInfo?.badge?.length > 0 &&
        Alert.alert('Verified!', profileInfo?.badge?.[1]?.badge?.description)
      }>
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

      {profileInfo?.badge?.length > 0 && (
        <View style={styles.ImageContainer}>
          <AppTouchableOpacity
            onPress={() =>
              Alert.alert(
                'Certified!',
                profileInfo?.badge?.[0]?.badge?.description,
              )
            }>
            <Image
              source={{
                uri: profileInfo?.badge?.[0]?.badge?.icon?.Location,
              }}
              style={styles.iconWrap}
              resizeMode="cover"
            />
          </AppTouchableOpacity>
          <AppTouchableOpacity
            onPress={() =>
              Alert.alert(
                'Verified!',
                profileInfo?.badge?.[1]?.badge?.description,
              )
            }>
            <Image
              source={{
                uri: profileInfo?.badge?.[1]?.badge?.image?.Location,
              }}
              style={styles.iconWrap}
              resizeMode="cover"
            />
          </AppTouchableOpacity>
        </View>
      )}
    </AppTouchableOpacity>
  );
};

export default ProviderProfileInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  ImageContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    // marginRight: 10,
    // backgroundColor: 'red',
    // marginLeft: 10,
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  iconWrap: {width: 40, height: 40},
});
