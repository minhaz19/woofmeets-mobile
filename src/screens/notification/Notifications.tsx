import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList, Platform, Alert} from 'react-native';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TitleText from '../../components/common/text/TitleText';
import DescriptionText from '../../components/common/text/DescriptionText';
import HeaderText from '../../components/common/text/HeaderText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import MiddleModal from '../../components/UI/modal/MiddleModal';
import messaging from '@react-native-firebase/messaging';
import baseUrl from '../../utils/helpers/httpRequest';
import { ApiResponse } from 'apisauce';
import apiClient from '../../api/client';

const Notifications = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {colors} = useTheme();
  const notifi = [
    {
      id: 1,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 5,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {});

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {}
        // setLoading(false);
      });
    messaging().onMessage(async remoteMessage => {});
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {}
  }

  const tokenManagement = async () => {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
    }

    try {
      messaging()
        .getToken()
        .then(async (token: any) => {
          // const response: ApiResponse<any> = await apiClient.get('/fcm-tokens', {
          //   token: token,
          // });
          // console.log(token);
        });
    } catch (error) {
      // console.log('myMethod: ', 'Error after getToken: ', error);
    }
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


  if (!notifi) {
    return (
      <View style={styles.loadingText}>
        <HeaderText text="Loading..." />
      </View>
    );
  }

  const onPress = () => {
    setIsModalVisible(true);
  };

  return (
    <View
      style={[
        styles.rootContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: colors.backgroundColor,
          opacity: isModalVisible ? 0.4 : 1,
        },
      ]}>
      <MiddleModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onBlur={undefined}>
        <TitleText text="Hello this is a new notification" />
      </MiddleModal>
      {notifi?.length > 0 && (
        <FlatList
          data={notifi}
          renderItem={({item}) => (
            <View
              style={{...styles.touchable}}
              key={item.id + Math.floor(Math.random() * 100)}>
              <TouchableOpacity onPress={onPress}>
                <Card
                  style={styles.headerContainer}
                  containerStyle={styles.contentStyle}>
                  <View style={styles.mainContainer}>
                    <View style={styles.headerSection}>
                      <DescriptionText
                        text={moment(item?.createdAt).fromNow()}
                      />
                      <TitleText text={item?.title} />
                    </View>
                    <Icon
                      name="keyboard-arrow-right"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          )}
          onEndReachedThreshold={0.5}
        />
      )}
      <View style={{height: 40}} />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerSection: {
    width: '90%',
    marginLeft: 15,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  loadingText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  contentStyle: {
    shadowColor: Colors.light.background,
    shadowOpacity: 0,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF0F6',
  },
  touchable: {
    overflow: 'hidden',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  nameView: {
    marginLeft: 5,
  },
});
