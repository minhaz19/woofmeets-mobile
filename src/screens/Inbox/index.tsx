/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import BottomSpacing from '../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../components/common/ScreenRapperGrey';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import UserProviderInbox from '../../components/ScreenComponent/Inbox/utils/Common/UserProviderInbox';
import ChatList from '../../components/ScreenComponent/Inbox/ChatList';
import AppTouchableOpacity from '../../components/common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../components/common/text/TitleText';
import BottomHalfModal from '../../components/UI/modal/BottomHalfModal';
import FilterAppointment from '../../components/ScreenComponent/Inbox/ChatList/component/FilterAppointment';
import Icon from 'react-native-vector-icons/Entypo';
import InboxLoader from './Loader/InboxLoader';
import methods from '../../api/methods';
import {useApi} from '../../utils/helpers/api/useApi';
import {ApiResponse, CancelToken} from 'apisauce';
import {API_URL} from '@env';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BellIcon} from '../../assets/svgs/SVG_LOGOS';
// import Ion from 'react-native-vector-icons/FontAwesome';
const Inbox = () => {
  const [active, setActive] = useState('USER');
  const [openFilter, setOpenFilter] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const back = route?.params?.back;
  const [status, setStatus] = useState({
    title: 'All',
    value: 'ALL',
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [activeStatus, setActiveStatus] = useState('All');
  const [userData, setUserData] = useState<any[]>([]);
  const [providerData, setProviderData] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const {request, loading} = useApi(methods._get);
  const [error, setError] = useState(false);

  // const [isPending, startTransition] = useTransitionProgress();
  // const [unFocused, setUnFocused] = useState(false);
  const fetchDataa = async (
    userType: string,
    cancelToken?: any,
    pageCount?: number,
    errorState?: boolean,
    statusState?: any,
  ) => {
    if (errorState ?? error) {
      return;
    }
    const page_ = pageCount ?? page;
    const status_ = statusState ?? status.value;
    const url =
      userType === 'USER'
        ? status_ === 'PENDING_REVIEW'
          ? `/appointment/inbox/pending-review?page=${page_}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
          : `${API_URL}/v3/appointment/inbox?status=${status_}&page=${page_}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : status_ === 'PENDING_REVIEW'
        ? `/appointment/inbox/pending-review/provider?page=${page_}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        : `${API_URL}/v3/appointment/provider/inbox?status=${status_}&page=${page_}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    const response: ApiResponse<any> = await request(
      url,
      {},
      {cancelToken: cancelToken.token},
    );
    if (response.ok) {
      const newData: any = await response?.data?.data;
      if (userType === 'USER') {
        setUserData(prevProps => [...prevProps, ...newData]);
      } else {
        setProviderData(prevProps => [...prevProps, ...newData]);
      }
    } else {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    if (back) {
      const source = CancelToken.source(); // <-- 1st step

      setUserData([]);
      setProviderData([]);
      setError(false);
      setPage(1);
      fetchDataa(active, source, 1, false);
      navigation.setParams({back: false});
    }
  }, [back, active, status]);

  useEffect(() => {
    const source = CancelToken.source(); // <-- 1st step
    fetchDataa(active, source);

    return () => {
      source.cancel();
    };
  }, [active]);

  const onRefresh = () => {
    const source = CancelToken.source(); // <-- 1st step
    setUserData([]);
    setProviderData([]);
    setError(false);
    setPage(1);
    fetchDataa(active, source, 1, false);
  };

  const handleLoadMore = () => {
    const source = CancelToken.source();
    setPage((prevProps: number) => prevProps + 1);
    fetchDataa(active, source, page + 1);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {loading &&
      ((active === 'USER' && userData.length === 0) ||
        (active === 'PROVIDER' && providerData.length === 0)) ? (
        <InboxLoader />
      ) : (
        <ScreenRapperGrey rapperStyle={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                // flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppTouchableOpacity
                onPress={() => setOpenFilter(!openFilter)}
                style={{
                  paddingVertical: 8,
                  backgroundColor: Colors.lightShade,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginRight: 15,
                }}>
                <TitleText
                  textStyle={{fontWeight: 'bold', marginRight: 10}}
                  text={activeStatus}
                />

                <Icon
                  name="chevron-down"
                  size={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 24 : 28
                  }
                  color={Colors.black}
                />
              </AppTouchableOpacity>
              <AppTouchableOpacity
                style={styles.bellContainer}
                onPress={() => navigation.navigate('Notifications')}>
                <BellIcon
                  height={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                  }
                />
                <View style={styles.bellView} />
              </AppTouchableOpacity>
            </View>
          </View>
          <View>
            <UserProviderInbox
              setActive={setActive}
              active={active}
              setPage={setPage}
              setError={setError}
              setProvider={setProviderData}
              setUser={setUserData}
            />
          </View>
          <View>
            {/* Inbox Items */}
            <ChatList
              data={active === 'USER' ? userData : providerData}
              statusType={active}
              handleLoadMore={handleLoadMore}
              loading={loading}
              onRefresh={onRefresh}
              pendingReview={status.value === 'PENDING_REVIEW' ? true : false}
            />
          </View>
          <View>
            {/* FIlter Modal */}
            <BottomHalfModal
              isModalVisible={openFilter}
              setIsModalVisible={setOpenFilter}>
              <FilterAppointment
                setActiveStatus={setActiveStatus}
                setProviderData={setProviderData}
                setUserData={setUserData}
                setOpenFilter={setOpenFilter}
                status={status}
                setStatus={setStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setPage={setPage}
                setLimit={setLimit}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                setError={setError}
                page={page}
                limit={limit}
                active={active}
                fetchData={fetchDataa}
              />
            </BottomHalfModal>
          </View>

          <BottomSpacing />
        </ScreenRapperGrey>
      )}
    </SafeAreaView>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  itemContainer: {
    paddingVertical: '2.5%',
    width: SCREEN_WIDTH / 4,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontWeight: '700',
    marginBottom: '1%',
    textAlign: 'center',
    width: '100%',
  },
  bottom1: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  iconStyle: {paddingRight: 5},
  text2: {
    fontWeight: '600',
    paddingBottom: '1%',
  },
  bellContainer: {paddingRight: 5, paddingTop: 5},
  bellView: {
    height: 7,
    width: 7,
    backgroundColor: 'red',
    position: 'absolute',
    right: 12,
    top: 5,
    borderRadius: 5,
    backfaceVisibility: 'hidden',
  },
});
