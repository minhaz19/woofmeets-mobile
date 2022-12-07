/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Text,
  Dimensions,
} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';

import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {io} from 'socket.io-client';
import {msgUrl} from '../../utils/helpers/httpRequest';
import {useAppSelector} from '../../store/store';
import WatchMiles from './components/WatchMiles';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
interface Props {
  appointmentId: number;
  trackLocation: any;
  setTrackLocation: any;
}
let trackInfo: any = {};
const RealtimeLocation = ({
  appointmentId,
}: // trackLocation,
// setTrackLocation,
Props) => {
  const mapRef = useRef<MapView>();
  const markerRef = useRef<MapView>();
  // const [trackLocation, setTrackLocation] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const {user} = useAppSelector(state => state.whoAmI);
  const {trackingStatus} = useAppSelector(state => state.trackingStatus);
  // const {request: getRequest} = useApi(methods._get);
  const [mapInfo, setMapInfo] = useState<any>({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });
  // console.log('user ', user);
  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const c = await Geolocation.requestAuthorization('whenInUse');
      return null;
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonPositive: '',
          },
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
    const _watchId =
      trackingStatus &&
      Geolocation.watchPosition(
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
        (error: any) => {},
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
  }, [trackingStatus]);

  useEffect(() => {
    if (socket === null) {
      let tempSocket = io(`${msgUrl}`);
      setSocket(tempSocket);
    }
  }, [socket]);
  const callApi = (payloadData: any) => {
    return new Promise(resolve => socket.emit('update-location', payloadData));
  };
  useMemo(() => {
    if (!trackingStatus) {
      return;
    }
    if (user.id !== null && trackingStatus) {
      const payloadData: any = {
        user: user.id,
        visit: appointmentId,
        lat: mapInfo.latitude,
        long: mapInfo.longitude,
      };
      callApi(payloadData);
    }
  }, [trackingStatus, mapInfo]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.mapcontainer}>
          <MapView
            // provider={}
            ref={mapRef}
            style={styles.mapStyle}
            initialRegion={{
              latitude: mapInfo.latitude,
              longitude: mapInfo.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            loadingEnabled
            zoomEnabled
            zoomTapEnabled
            showsUserLocation
            followsUserLocation
            showsCompass
            userLocationPriority="high"
            onUserLocationChange={e => null}
            showsPointsOfInterest={true}
            // onRegionChangeComplete={onChangeValue}
          >
            {/* <Polyline
              coordinates={mapInfo.coordinates}
              strokeColor="#bf8221"
              strokeColors={[
                '#bf8221',
                '#ffe066',
                '#ffe066',
                '#ffe066',
                '#ffe066',
              ]}
              strokeWidth={6}
            /> */}
            {/* <Marker
              // ref={markerRef}
              coordinate={{
                latitude: mapInfo.latitude,
                longitude: mapInfo.longitude,
              }}
            /> */}
          </MapView>
        </View>
        <WatchMiles
        // trackLocation={trackLocation}
        // setTrackLocation={setTrackLocation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  mapcontainer: {
    width: '100%',
    height: 400,
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
    height: '100%',
    width: '100%',
  },
});

export default memo(RealtimeLocation);
