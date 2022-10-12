import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Dimensions, Platform, PermissionsAndroid} from 'react-native';
import MapView, {AnimatedRegion, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Geolocation from '@react-native-community/geolocation';
import { saveCurrentUserLocation } from '../../../store/slices/address/address';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const NavigateMap = () => {
  const dispatch = useAppDispatch();
  const add = {latitude: 23.7639, longitude: 89.6467}
  const currentUserLocation = useAppSelector(state => state.address.currentUserLocation);
  const mapRef = useRef<MapView>();
  const markerRef = useRef<MapView>();
  const [state, setState] = useState({
    curLoc: {
      latitude: currentUserLocation?.latitude ? currentUserLocation?.latitude : 55.5033,
      longitude: currentUserLocation?.longitude ? currentUserLocation?.longitude : 0.1196,
    },
    otherParty: {
      latitude: currentUserLocation?.latitude ? currentUserLocation?.latitude : 51.5033,
      longitude: currentUserLocation?.longitude ? currentUserLocation?.longitude : 0.1196,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: currentUserLocation?.latitude ? currentUserLocation?.latitude : 23.7639,
      longitude: currentUserLocation?.longitude ? currentUserLocation?.longitude : 89.6467,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
  });
  const [locationStatus, setLocationStatus] = useState('');

  const {curLoc, otherParty, isLoading, coordinate} = state;

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    console.log(locationStatus, curLoc, coordinate);
  }, [locationStatus])

  const getLiveLocation = async () => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
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
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      // Geolocation.clearWatch(watchID);
    };
  };

  const animateToRegion = (currentLatitude?: any, currentLongitude?: any) => {
    mapRef.current?.animateToRegion({
      latitude: currentLatitude,
      longitude: currentLongitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }

  // useEffect(() => {
  //   animateToRegion()
  // }, [curLoc]);


  const getOneTimeLocation = async () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      async position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        animateToRegion(currentLatitude, currentLongitude)
        animate(currentLatitude, currentLongitude);
        setState({
          ...state,
          curLoc: {latitude: currentLatitude, longitude: currentLongitude},
          // destinationCords: {latitude: currentLatitude, longitude: currentLongitude},
          coordinate: new AnimatedRegion({
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
        dispatch(
          saveCurrentUserLocation({
            currentUserLocation: position.coords,
          }),
        );
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const animate = (latitude: any, longitude: any) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
    setState({
      ...state,
      curLoc: {latitude, longitude},
      coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });
  };

  const onChangeValue = (initialRegion: {latitude: any; longitude: any}) => {
    setState({
      ...state,
      destinationCords: {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsPointsOfInterest={true}
          showsCompass={true}
          // onRegionChangeComplete={onChangeValue}
          >
          <Marker.Animated
            ref={markerRef}
            coordinate={curLoc}
          />
        </MapView>
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
