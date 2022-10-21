/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getAppointmentStatus} from '../../../../store/slices/Appointment/Inbox/User/getAppointmentStatus';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
const CompletedStatus = () => {
  let navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {appointmentStatus, loading} = useAppSelector(
    state => state.appointmentStatus,
  );

  useEffect(() => {
    appointmentStatus === null && dispatch(getAppointmentStatus('PROPOSAL'));
  }, [dispatch, appointmentStatus]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    appointmentStatus === null && dispatch(getAppointmentStatus('PROPOSAL'));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {appointmentStatus === null ? (
          <View style={styles.errorContainer}>
            <MessageNotSend
              svg={<UpcomingSvg width={200} height={200} />}
              title={'No messages in Upcoming inbox'}
              description={
                " You'll find messages here when you and sitter have confirmed a booking together"
              }
            />
          </View>
        ) : (
          <View style={styles.container}>
            <FilterByDateAndActivity
              handleActivity={() => {}}
              handleDate={() => {}}
            />
            {appointmentStatus !== null ? (
              appointmentStatus.map((item: any) => {
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: `${item.provider.user.firstName} ${item.provider.user.lastName}`,
                      image: item.provider.user.image,
                      description: item?.appointmentProposal[0]?.firstMessage
                        ? item?.appointmentProposal[0]?.firstMessage
                        : 'No Mesaegs fonnd',
                      boardingTime: item?.providerService?.serviceType?.name,
                      // boardingTime: item?.appointmentProposal[0]
                      //   ?.proposalStartDate
                      //   ? `${item.appointmentProposal[0].proposalStartDate} to ${item.appointmentProposal[0].proposalEndDate} `
                      //   : '',
                      // pickUpStartTime: item?.appointmentProposal[0]
                      //   ?.pickUpStartTime
                      //   ? item.appointmentProposal[0].pickUpStartTime
                      //   : '',
                      status: item.status,
                    }}
                    buttonStyles={Colors.primary}
                    handlePress={() =>
                      navigation.navigate('ActivityScreen', {
                        appointmentOpk: item.opk,
                      })
                    }
                  />
                );
              })
            ) : (
              <MessageNotSend
                svg={<UpcomingSvg width={200} height={200} />}
                title={'No messages in Upcoming inbox'}
                description={
                  " You'll find messages here when you and sitter have confirmed a booking together"
                }
              />
            )}
          </View>
        )}

        <BottomSpacingNav />
      </ScrollView>
    </>
  );
};

export default CompletedStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noMessages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    paddingTop: 100,
  },
});
