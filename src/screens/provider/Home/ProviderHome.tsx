/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderText from '../../../components/common/text/HeaderText';
import ShortText from '../../../components/common/text/ShortText';
import TitleText from '../../../components/common/text/TitleText';
import BookingCard from '../../../components/ScreenComponent/Provider/Home/BookingCard';
import Colors from '../../../constants/Colors';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
import {getProviderInprogressApnt} from '../../../store/slices/Appointment/Inbox/Provider/InProgress/getPInprogressApnt';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import subDays from 'date-fns/subDays';
import formatDistance from 'date-fns/formatDistance';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import DescriptionText from '../../../components/common/text/DescriptionText';

const ProviderHome = (props: {
  navigation: {navigate: (arg0: string) => any};
}) => {
  const dispatch = useAppDispatch();

  const providerInprogress = useAppSelector(
    state => state.providerInprogress?.providerInprogress,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProviderInprogressApnt('PAID'));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScreenRapperGrey>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
          <HeaderText text="Today" textStyle={{paddingBottom: 4}} />
          <ShortText
            text={`${
              providerInprogress ? providerInprogress?.length : 0
            } Booking`}
          />
        </View>
        <View style={styles.spacing}>
          <TitleText
            text={new Date().toLocaleDateString()}
            textStyle={{paddingBottom: 4}}
          />
        </View>
        {/* <View style={styles.spacing}>
          <ShortText text="Booking" textStyle={styles.bookingText} />
        </View> */}
        <View>
          {providerInprogress ? providerInprogress?.map((item: any, index) => {
            return (
              <BookingCard
                key={index}
                item={item}
                buttonStyles={Colors.yellow}
                // onScreen={() => props.navigation.navigate('OngoingActivityScreen')}
                onScreen={() =>
                  props.navigation.navigate('ActivityScreen', {
                    appointmentOpk: item.opk,
                  })
                }
              />
            );
          }) : <DescriptionText text={'No upcoming schedules found!'} textStyle={{paddingVertical: '10%'}}/>}
        </View>
        <View style={styles.spacing}>
          <ShortText
            text={`Last checked today at ${formatDistance(
              subDays(new Date(), 0),
              new Date(),
              {addSuffix: true},
            )}`}
            textStyle={styles.bookingTextDes}
          />
        </View>
        <BottomSpacing />
      </ScrollView>
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingBottom: 10,
  },
  bookingText: {
    fontWeight: '600',
    color: Colors.blue,
    paddingBottom: 6,
  },
  bookingTextDes: {
    fontWeight: '600',
  },
  spacing: {
    paddingBottom: 10,
  },
});

export default ProviderHome;
