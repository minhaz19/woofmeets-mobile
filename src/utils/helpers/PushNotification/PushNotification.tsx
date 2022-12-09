import {View, Text, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {ApiResponse} from 'apisauce';
import authStorage from '../auth/storage';
import {apiNotification} from '../../../api/client';

const PushNotification = () => {
  const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {});

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
        }
        // setLoading(false);
      });
    messaging().onMessage(async remoteMessage => {});
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  }

  const tokenManagement = async () => {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
    }

    try {
      await authStorage.getToken();
      messaging()
        .getToken()
        .then(async (deviceToken: any) => {
          const response: ApiResponse<any> = await apiNotification.post(
            '/v1/push-notifications',
            {
              registrationToken: deviceToken,
            },
          );
        });
    } catch (error) {}
  };

  useEffect(() => {
    // Get the device token
    requestUserPermission();
    tokenManagement();

    NotificationListner();
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {});
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new notification arrived!',
        remoteMessage.notification.body,
        remoteMessage.notification.description,
      );
    });

    return unsubscribe;
  });
  return null;
};

export default PushNotification;
