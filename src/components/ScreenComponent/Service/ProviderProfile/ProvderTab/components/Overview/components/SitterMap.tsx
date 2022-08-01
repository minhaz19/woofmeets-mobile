import {StyleSheet, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import TitleText from '../../../../../../../common/text/TitleText';
import ShortText from '../../../../../../../common/text/ShortText';
import {MapMarker} from '../../../../../../../../assets/svgs/SVG_LOGOS';
import {SCREEN_WIDTH} from '../../../../../../../../constants/WindowSize';
const SitterMap = () => {
  return (
    <>
      <TitleText textStyle={styles.titleText} text="Location" />
      <View style={styles.locationText}>
        <MapMarker />
        <ShortText textStyle={styles.shortText} text="1.5 mile away from you" />
      </View>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title={'Meers home'}
            description={'Meers wife home'}
          />
        </MapView>
      </View>
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
    height: SCREEN_WIDTH > 500 ? 250 : 200,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    marginTop: 10,
  },
});
