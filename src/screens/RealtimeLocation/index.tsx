/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Text_Size from '../../constants/textScaling';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';

const RealtimeLocation = () => {
  const [mapInfo, setMapInfo] = useState<any>({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const c = await Geolocation.requestAuthorization('whenInUse');
      return null;
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err: any) {
        console.warn(err.message);
        return false;
      }
    }
  }
  async function getCurrentPosition() {
    const hasLocationPermission = await requestLocationPermission();

    if (hasLocationPermission === false) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setMapInfo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: mapInfo.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  }
  useEffect(() => {
    getCurrentPosition();
    const _watchId = Geolocation.watchPosition(
      (position: any) => {
        setMapInfo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: mapInfo.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      (error: any) => {
        // See error code charts below.
        // console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);

  return (
    <>
      <View style={styles.containerm}>
        <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: mapInfo.latitude,
            longitude: mapInfo.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled
          showsUserLocation
          followsUserLocation
          showsCompass
          userLocationPriority="high"
          zoomEnabled
          onUserLocationChange={e => null}>
          <Polyline
            coordinates={mapInfo.coordinates}
            strokeColor="#bf8221"
            strokeColors={[
              '#bf8221',
              '#ffe066',
              '#ffe066',
              '#ffe066',
              '#ffe066',
            ]}
            strokeWidth={3}
          />
          <Marker
            // ref={markerRef}
            coordinate={{
              latitude: mapInfo.latitude,
              longitude: mapInfo.longitude,
            }}
          />
        </MapView>
      </View>
      <Text>Latitude: {mapInfo.latitude}</Text>
      <Text>longitude: {mapInfo.longitude}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  containerm: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  rootContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '0%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
    paddingTop: SCREEN_WIDTH <= 380 ? '0%' : SCREEN_WIDTH <= 600 ? '8%' : '10%',
  },
  boxContainer: {paddingHorizontal: '10%'},
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
    fontSize: Text_Size.Text_1,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  cancelContainer: {
    alignSelf: 'flex-end',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '10%',
  },
  textHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
  },
  zipText: {
    fontSize: Text_Size.Text_0,
    fontWeight: '500',
    paddingBottom: 10,
  },
  zipContainer: {
    paddingTop: '5%',
  },
});

export default RealtimeLocation;
