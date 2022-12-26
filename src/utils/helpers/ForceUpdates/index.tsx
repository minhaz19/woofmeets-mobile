/* eslint-disable react-hooks/exhaustive-deps */
import {Platform, Alert, BackHandler} from 'react-native';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';
import methods from '../../../api/methods';
import RNExitApp from 'react-native-exit-app';

const ForceUpdates = () => {
  let currentVersion = VersionCheck.getCurrentVersion(); // Automatically choose profer provider using `Platform.select` by device platform.
  console.log(currentVersion);
  const checkIfUpdateIsNeeded = async () => {
    const response = await methods._get(
      `user-application-version/compare?platform=${Platform.OS.toUpperCase()}&version=${'1.8.2'}`,
    );
    console.log(response?.data?.data);
    if (response.ok && response?.data?.data?.isForceUpdate) {
      Alert.alert(
        'Please Update',
        'You will have to update your app to the latest version to continue.',
        [
          {
            text: 'Update',
            onPress: async() => {
              await Linking.openURL(response?.data?.data?.storeRedirectUrl);
              BackHandler.exitApp();
              RNExitApp.exitApp();
            },
          },
        ],
      );
    }
  };
  useEffect(() => {
    checkIfUpdateIsNeeded();
  }, []);
  return null;
};

export default ForceUpdates;
