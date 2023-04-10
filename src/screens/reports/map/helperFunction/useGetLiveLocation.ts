import Geolocation from '@react-native-community/geolocation';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {saveCurrentUserLocation} from '../../../../store/slices/address/address';
import {useAppDispatch} from '../../../../store/store';

const useGetLiveLocation = () => {
  const dispatch = useAppDispatch();
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          await dispatch(
            saveCurrentUserLocation({
              currentUserLocation: position.coords,
            }),
          );
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          return cords;
        }
      },
      error => {
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const LiveLocation = async () => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        await getCurrentLocation();
      } else {
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
            getCurrentLocation();
          } else {
            // setLocationStatus('Permission Denied');
          }
        } catch (err) {
        }
      }
    };
    requestLocationPermission();
    return () => {
      // Geolocation.clearWatch(watchID);
    };
  };

  useEffect(() => {
    LiveLocation();
  }, []);

  return {};
};

export default useGetLiveLocation;
