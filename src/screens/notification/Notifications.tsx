/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import TitleText from '../../components/common/text/TitleText';
import DescriptionText from '../../components/common/text/DescriptionText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {
  emptyNotificationsData,
  getNotifications,
} from '../../store/slices/notifications/notificationsSlice';
import {useAppDispatch, useAppSelector} from '../../store/store';
import FetchMoreLoader from '../../components/common/Loaders/FetchMoreLoader';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const {notificationsData, totalNotifications, footerLoading, loading} =
    useAppSelector((state: {notification: any}) => state.notification);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {colors} = useTheme();

  const loadMore = () => {
    if (totalNotifications?.total % notificationsData?.length !== 0) {
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    dispatch(getNotifications({limit: 20, page: currentPage}));
  }, [currentPage]);

  const onPress = () => {
    // setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(emptyNotificationsData());
  }, []);
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
      {/* <MiddleModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onBlur={undefined}>
        <TitleText text="Hello this is a new notification" />
      </MiddleModal> */}
      {notificationsData?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={true}
          data={notificationsData}
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
                      <TitleText text={item?.data?.message} />
                    </View>
                    {/* <Icon
                      name="keyboard-arrow-right"
                      size={24}
                      color={Colors.primary}
                    /> */}
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          )}
          // ListFooterComponent={() => {
          //   return (totalNotifications?.total % notificationsData?.length !== 0 ? <ActivityIndicator size={'small'} animating={footerLoading} /> : <></>);
          // }}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.02}
        />
      )}
      {notificationsData.length === 0 && !loading && (
        <TitleText
          text={'You have no notifications right now'}
          textStyle={{color: Colors.gray, textAlign: 'center'}}
        />
      )}
      {loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FetchMoreLoader width={Platform.OS === 'ios' ? '20%' : '25%'} />
        </View>
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
