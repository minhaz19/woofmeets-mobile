/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';

import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {useAppSelector} from '../../store/store';
import WatchMiles from './components/WatchMiles';
import {socket} from '../../../App';
// import HeaderText from '../../components/common/text/HeaderText';
// import Colors from '../../constants/Colors';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// let _watchId: number | null = null;
interface Props {
  appointmentId: number;
  trackLocation: any;
  setTrackLocation: any;
}
// let trackInfo: any = {};
const RealtimeLocation = ({appointmentId}: Props) => {
  const mapRef = useRef<MapView | undefined>();
  const {user} = useAppSelector(state => state.whoAmI);
  const {
    trackingStatus,
    distance: redDistance,
    coordinates: redCoordinates,
  } = useAppSelector(state => state.trackingStatus);
  const [_watchId, setWatchId] = useState<number | null>(null);
  const [mapInfo, setMapInfo] = useState<any>({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });
  const [distance, setDistance] = useState(0);
  const [coordinates, setCoordinates] = useState([{latitude: 0, longitude: 0}]);

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
        return false;
      }
    }
  }

  useEffect(() => {
    requestLocationPermission();
    if (trackingStatus) {
      setWatchId(
        Geolocation.watchPosition(
          (position: any) => {
            const {latitude, longitude} = position.coords;
            setMapInfo({
              latitude: latitude,
              longitude: longitude,
              coordinates: mapInfo.coordinates.concat({
                latitude: latitude,
                longitude: longitude,
              }),
            });

            setCoordinates(e => [...e, {latitude, longitude}]);
          },
          (error: any) => {},
          {
            enableHighAccuracy: true,
            distanceFilter: 1,
            interval: 5000,
            fastestInterval: 2000,
          },
        ),
      );
    } else if (_watchId !== null) {
      Geolocation.clearWatch(_watchId);
    }
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, [trackingStatus]);

  useEffect(() => {
    if (!trackingStatus || !socket.connected) {
      return;
    }
    if (user.id !== null) {
      const payloadData = {
        user: user.id,
        visit: appointmentId,
        lat: mapInfo.latitude,
        long: mapInfo.longitude,
      };
      socket.emit('update-location', payloadData);
    }
    return () => {
      // socket.off();
    };
  }, [trackingStatus, mapInfo, socket.connected, user.id]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 3959; // radius of Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useMemo(() => {
    let arr = [...coordinates];
    arr.shift();
    const one = arr[arr?.length - 2]?.latitude;
    const two = arr[arr?.length - 2]?.longitude;
    const three = arr[arr?.length - 1]?.latitude;
    const four = arr[arr?.length - 1]?.longitude;
    const currnt =
      arr?.length > 2 ? calculateDistance(one, two, three, four) : 0;
    // coordinates?.length > 1 &&

    setDistance(dis => dis + currnt);
  }, [coordinates]);

  useEffect(() => {
    setDistance(redDistance);
    setCoordinates(redCoordinates);
  }, [redDistance, redCoordinates]);

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            latitude: mapInfo.latitude,
            longitude: mapInfo.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // loadingEnabled
          zoomEnabled
          // zoomTapEnabled
          showsUserLocation
          followsUserLocation={trackingStatus}
          // showsCompass
          userLocationPriority="high"
          showsPointsOfInterest={true}>
          {coordinates?.map((coordinate, index) => (
            <Marker
              key={`${coordinate.latitude},${(coordinate.longitude, index)}`}
              coordinate={coordinate}>
              <Image
                source={require('../../assets/pin.png')}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
      </View>
      <WatchMiles
        distance={distance}
        coordinates={coordinates}
        // setMapInfo={setMapInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
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
