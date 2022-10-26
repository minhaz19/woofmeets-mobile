/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getAppointmentStatus} from '../../../../store/slices/Appointment/Inbox/User/Proposal/getAppointmentStatus';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
import {getProviderApnt} from '../../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import BottomSpacing from '../../../UI/BottomSpacing';
import {format} from 'date-fns';
interface Props {
  statusType: string;
}
const PendingStatus = ({statusType}: Props) => {
  let navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {appointmentStatus, loading} = useAppSelector(
    state => state.appointmentStatus,
  );
  const {providerApntStatus} = useAppSelector(
    state => state.providerApntStatus,
  );

  useEffect(() => {
    statusType === 'USER' && dispatch(getAppointmentStatus('PROPOSAL'));
    statusType === 'PROVIDER' && dispatch(getProviderApnt('PROPOSAL'));
  }, [statusType]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    statusType === 'USER' && dispatch(getAppointmentStatus('PROPOSAL'));
    statusType === 'PROVIDER' && dispatch(getProviderApnt('PROPOSAL'));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);
  console.log('info', providerApntStatus);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {(appointmentStatus === null || appointmentStatus === undefined) &&
        statusType === 'USER' ? (
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
            {appointmentStatus !== null &&
            appointmentStatus !== undefined &&
            statusType === 'USER' ? (
              appointmentStatus?.map((item: any) => {
                const serviceTypeId = item?.providerService?.serviceTypeId;
                const proposalDate = item.appointmentProposal[0];
                const isRecurring = item.appointmentProposal[0]?.isRecurring;
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: `${item.provider.user.firstName} ${item.provider.user.lastName}`,
                      image: item.provider.user.image,
                      description: item?.providerService
                        ? serviceTypeId === 1 || serviceTypeId === 2
                          ? `Starting From:  ${format(
                              new Date(proposalDate.proposalStartDate),
                              'iii LLL d',
                            )}`
                          : serviceTypeId === 3 || serviceTypeId === 5
                          ? isRecurring
                            ? `Starting From:  ${format(
                                new Date(proposalDate.recurringStartDate),
                                'iii LLL d',
                              )}`
                            : `Starting From:  ${format(
                                new Date(
                                  proposalDate.proposalOtherDate[0].date,
                                ),
                                'iii LLL d',
                              )}`
                          : serviceTypeId === 4
                          ? isRecurring
                            ? `Starting From:  ${format(
                                new Date(proposalDate.recurringStartDate),
                                'iii LLL d',
                              )}`
                            : `Starting From:  ${format(
                                new Date(
                                  proposalDate.proposalOtherDate[0].date,
                                ),
                                'iii LLL d',
                              )}`
                          : ''
                        : 'No Mesaegs fonnd',
                      boardingTime: item?.providerService?.serviceType?.name,
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
            ) : providerApntStatus !== null &&
              providerApntStatus !== undefined &&
              statusType === 'PROVIDER' ? (
              providerApntStatus?.map((item: any) => {
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: `${item.user.firstName} ${item.user.lastName}`,
                      image: item.user.image,
                      description: item?.appointmentProposal[0]?.firstMessage
                        ? item?.appointmentProposal[0]?.firstMessage
                        : 'No Mesaegs fonnd',
                      boardingTime: item?.providerService?.serviceType?.name,
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

        <BottomSpacing />
        <BottomSpacing />
      </ScrollView>
    </>
  );
};

export default PendingStatus;

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
