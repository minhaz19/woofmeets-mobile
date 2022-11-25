/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';

import Colors from '../../../constants/Colors';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const NavigateMap = ({mapData}: any) => {
  const [mapPoints, setMapPoints] = useState<any>([]);

  useEffect(() => {
    const da = mapData?.map((item: any) => item.points);
    console.log('dat');
    const result = da?.reduce((r: any, e: any) => (r.push(...e), r), []);
    const formatted = result?.map((it: any) => ({
      latitude: it.lat !== null || it.lat !== 0 ? it.lat : result[3]?.lat,
      longitude: it.long !== null || it.long !== 0 ? it.long : result[3]?.long,
    }));
    setMapPoints(formatted);
  }, [mapData]);

  const mapRef = useRef<MapView>();
  const markerRef = useRef<MapView>();
  console.log('mapPoints', mapPoints, mapData, {
    latitude: mapPoints?.[0]?.latitude,
    longitude: mapPoints?.[0]?.longitude,
  });
  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: mapPoints?.[0]?.latitude,
            longitude: mapPoints?.[0]?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // initialRegion={mapPoints && mapPoints?.[0] ? mapPoints[0] : {}}
          loadingEnabled={mapPoints?.lat === undefined ? true : false}
          zoomEnabled={false}>
          <Polyline
            coordinates={mapPoints}
            strokeColor={Colors.blue} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        </MapView>
        {/* <MapView
          style={styles.mapStyle}
          region={{latitude: 37.8025259, longitude: -122.4351431}}>
          <Polyline
            coordinates={[
              {latitude: 37.8025259, longitude: -122.4351431},
              {latitude: 37.7896386, longitude: -122.421646},
              {latitude: 37.7665248, longitude: -122.4161628},
              {latitude: 37.7734153, longitude: -122.4577787},
              {latitude: 37.7948605, longitude: -122.4596065},
              {latitude: 37.8025259, longitude: -122.4351431},
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          />
        </MapView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  mapcontainer: {
    height: '100%',
    width: '100%',
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
  bottom: {height: 70},
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});

export default NavigateMap;
