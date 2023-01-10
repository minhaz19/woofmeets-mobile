import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeaderText from '../../../../components/common/text/HeaderText';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import BookingCard from '../../../../components/ScreenComponent/Provider/Home/BookingCard';
// import {
//   BoardingIcon,
//   DoggyDayCareIcon,
//   DogWalkingIcon,
//   DropInVisitIcon,
//   HouseSittingIcon,
// } from '../../../../assets/svgs/Services_SVG';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {ApiResponse, CancelToken} from 'apisauce';

import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import TitleText from '../../../../components/common/text/TitleText';
import AppTouchableOpacity from '../../../../components/common/AppClickEvents/AppTouchableOpacity';
import {UpcomingSvg} from '../../../../components/ScreenComponent/Inbox/utils/SvgComponent/SvgComponent';
import FetchMoreLoader from '../../../../components/common/Loaders/FetchMoreLoader';
// const getIcon = (iconId: number) => {
//   switch (iconId) {
//     case 1:
//       return BoardingIcon;
//     case 2:
//       return HouseSittingIcon;
//     case 3:
//       return DropInVisitIcon;
//     case 4:
//       return DoggyDayCareIcon;
//     case 5:
//       return DogWalkingIcon;
//   }
// };
const ScheduleAppointmentList = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {request, loading} = useApi(methods._performent_post);
  const {id} = route.params;
  const [limit] = useState(20);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchData = async (
    source: any,
    pageCount?: number,
    errorState?: boolean,
  ) => {
    if (errorState ?? error) {
      return;
    }
    const page_ = pageCount ? pageCount : page;
    const url =
      id === 1
        ? `/appointment/provider/scheduler/on-going?page=${page_}&limit=${limit}&sortBy=${'createdAt'}&sortOrder=${'desc'}`
        : id === 2
        ? `/appointment/provider/scheduler/upcoming?page=${page_}&limit=${limit}&sortBy=${'createdAt'}&sortOrder=${'desc'}`
        : `/appointment/provider/scheduler/past?page=${page_}&limit=${limit}&sortBy=${'createdAt'}&sortOrder=${'desc'}`;

    const payload = {
      currentDate: new Date(
        new Date().toISOString().split('T')[0],
      ).toISOString(),
      daysCount: 5000,
    };
    const response: ApiResponse<any> = await request(url, payload, source);
    if (response.ok) {
      const newData: any = await response?.data?.data;

      setData((prevData: any) => [...prevData, ...newData]);
    } else if (!response.ok) {
      setError(true);
      return;
    }
  };
  useEffect(() => {
    const source = CancelToken.source(); // <-- 1st step
    fetchData(source);
    return () => {
      source.cancel();
    };
  }, []);

  const onRefresh = () => {
    const source = CancelToken.source(); // <-- 1st step
    setData([]);
    setError(false);
    setPage(1);
    fetchData(source, 1, true);
  };

  const handleLoadMore = () => {
    const source = CancelToken.source(); // <-- 1st step
    setPage((prePage: number) => prePage + 1);
    fetchData(source, page + 1);
  };
  return data?.length === 0 && loading ? (
    <View style={styles.loader}>
      <FetchMoreLoader width={Platform.OS === 'ios' ? '20%' : '25%'} />
    </View>
  ) : (
    <View style={styles.flatlistContainer}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
        renderItem={({item}) => {
          return (
            <BookingCard
              apntItem={item}
              buttonStyles={Colors.yellow}
              // Icon={getIcon(item?.appointment?.providerService?.serviceTypeId)}
              onScreen={() =>
                navigation.navigate('ActivityScreen', {
                  appointmentOpk: item?.appointment.opk,
                  messageGroupId: item?.appointment.messageGroupId,
                  AppointmentTab: true,
                })
              }
            />
          );
        }}
        keyExtractor={(item, index) => String(index)}
        onEndReached={data?.length < 10 ? null : handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <>
              <View style={styles.footerLoader}>
                <FetchMoreLoader
                  width={Platform.OS === 'ios' ? '20%' : '25%'}
                />
              </View>
              <BottomSpacing />
              <BottomSpacing />
            </>
          ) : (
            <>
              <BottomSpacing />
              <BottomSpacing />
            </>
          )
        }
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <View>
              <UpcomingSvg width={200} height={200} />
            </View>
            <View>
              <HeaderText
                text={'No Appointments'}
                textStyle={styles.headerText}
              />
              <TitleText
                textStyle={styles.noAppointmentTitle}
                text={`You do not have any ${
                  id === 1
                    ? 'current or running appointments'
                    : id === 2
                    ? 'appoinments in up-comming days'
                    : 'appointment in past'
                }`}
              />
              <AppTouchableOpacity onPress={() => navigation.goBack()}>
                <TitleText text={'Go Back'} textStyle={styles.goBack} />
              </AppTouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ScheduleAppointmentList;

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flexGrow: 1,

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: '900',
    fontSize: Text_Size.Text_6,
    // color: Colors.gray,
    textAlign: 'center',
  },
  noAppointmentTitle: {
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    color: 'gray',
  },
  goBack: {
    color: Colors.primaryDif,
    textAlign: 'center',
    fontWeight: '900',
  },
  footerLoader: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatlistContainer: {marginHorizontal: 20, marginTop: 20, flex: 1},
  contentContainer: {flexGrow: 1},
});
