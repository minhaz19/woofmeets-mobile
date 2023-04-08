// import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS, checkMultiple, requestMultiple} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    var permission: any;
    permission =
      parseInt(Platform.Version, 10) < 13
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    await request(permission);
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
};
