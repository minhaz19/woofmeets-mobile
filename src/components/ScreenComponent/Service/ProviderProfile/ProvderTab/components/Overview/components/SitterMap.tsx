import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import {MapMarker} from '../../../../../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../../../../../../constants/WindowSize';
import {useAppSelector} from '../../../../../../../../store/store';
const SitterMap = () => {
  const {location} = useAppSelector(state => state.providerProfile);
  return (
    <>
      <TitleText textStyle={styles.titleText} text="Location" />
      {/* <View style={styles.locationText}>
        <MapMarker />
        <ShortText textStyle={styles.shortText} text="1.5 mile away from you" />
      </View> */}
      {location?.latitude !== undefined && location.longitude !== undefined && 
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: location?.latitude ? location?.latitude : 18.476223,
                longitude: location?.longitude
                  ? location?.longitude
                  : -77.89389,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{
                  latitude: location?.latitude ? location?.latitude : 18.476223,
                  longitude: location?.longitude
                    ? location?.longitude
                    : -77.89389,
                }}
                // title={'Meers home'}
                // description={'Meers wife home'}
              >
                <Image
                  source={{
                    uri: 'https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png',
                  }}
                  style={{width: 46, height: 46}}
                  resizeMode="contain"
                />
              </Marker>
            </MapView>
          </View>
        }
    </>
  );
};

export default SitterMap;
const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  shortText: {
    marginLeft: 3,
  },
  locationText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  container: {
    height: SCREEN_WIDTH > 800 ? 250 : 200,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    marginTop: 10,
  },
});
