import messaging from '@react-native-firebase/messaging';
import {Linking, Platform } from 'react-native';

import { fcmDeviceToken, notiificationPressed } from '../../../store/slices/auth/userSlice';
import store from '../../../store/store';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';


const {dispatch} = store;

export const notificationPermissionsIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
};

export const getDeviceToken = async () => {
    const isPermissionAllowed = await notificationPermissionsIos();
    if (isPermissionAllowed) {
        messaging().getToken().then(async (deviceToken: any) => {
            dispatch(fcmDeviceToken(deviceToken)); //dispatching device token at store
            if (Platform.OS === 'ios') {
                return deviceToken;
            } else {
                return deviceToken;
            }
        });
    }
};

export const showForegroundNotifications = async (message: any) => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(message));
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
    title: message?.data?.title,
    body: message?.data?.message,
    data: message?.data,
    android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher',
        pressAction: {
            id: Platform.OS === 'android' ? message?.data?.androidClickIntent : 'default',
        },
    },
    ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
};

notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
        case EventType.DISMISSED:
            break;
        case EventType.PRESS:
            dispatch(notiificationPressed(true));
            const androidRoute = detail?.pressAction?.id || 'services';
            const iosRoute = detail?.notification?.data?.iosClickCategory || 'services';
            if (Platform.OS === 'android') {
                Linking.openURL(`woofmeets://app/${androidRoute}`);
            } else {
                Linking.openURL(`woofmeets://app/${iosRoute}`);
            }
            break;
    }
});

notifee.onForegroundEvent( async ({ type, detail })  => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        dispatch(notiificationPressed(true));
        const androidRoute = detail?.notification?.android?.pressAction?.id || 'services';
        const iosRoute = detail?.notification?.data?.iosClickCategory || 'services';
        if (Platform.OS === 'android') {
            Linking.openURL(`woofmeets://app/${androidRoute}`);
        } else {
            Linking.openURL(`woofmeets://app/${iosRoute}`);
        }
        break;
    }
});

export const registerBackgroundHandler = async () => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
        const channelId = await notifee.createChannel({
            id: 'important',
            name: 'Important Notifications',
            importance: AndroidImportance.HIGH,
        });
        await notifee.displayNotification({
        title: remoteMessage?.data?.title,
        body: remoteMessage?.data?.message,
        data: remoteMessage?.data,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher',
            pressAction: {
                id: Platform.OS === 'android' ? remoteMessage?.data?.androidClickIntent : 'default',
            },
        },
        ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
          },
        });
    });
};
