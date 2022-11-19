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
import {getProviderApnt} from '../../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import BottomSpacing from '../../../UI/BottomSpacing';
import changeTextLetter from '../../../common/changeTextLetter';
import InboxLoader from '../../../../screens/Inbox/Loader/InboxLoader';
import {formatDate} from '../../../common/formatDate';
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    statusType === 'USER' && (await dispatch(getAppointmentStatus('PROPOSAL')));
    statusType === 'PROVIDER' && (await dispatch(getProviderApnt('PROPOSAL')));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, [statusType]);

  return (
    <>
      {loading ? (
        <InboxLoader />
      ) : (
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
                title={'No messages in Pending inbox'}
                description={
                  "You'll find messages here when you and sitter have a pending or accepted booking"
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
                        name: changeTextLetter(
                          `${item.provider.user.firstName} ${item.provider.user.lastName}`,
                        )!,
                        image: item.provider.user.image,
                        description: item?.providerService
                          ? serviceTypeId === 1 || serviceTypeId === 2
                            ? `Starting From:  ${formatDate(
                                proposalDate.proposalStartDate,
                                'iii LLL d',
                              )}`
                            : serviceTypeId === 3 || serviceTypeId === 5
                            ? isRecurring
                              ? `Starting From:  ${formatDate(
                                  proposalDate.recurringStartDate,
                                  'iii LLL d',
                                )}`
                              : `Starting From:  ${formatDate(
                                  proposalDate.proposalVisits[0].date,
                                  'iii LLL d',
                                )}`
                            : serviceTypeId === 4
                            ? isRecurring
                              ? `Starting From:  ${formatDate(
                                  proposalDate.recurringStartDate,
                                  'iii LLL d',
                                )}`
                              : `Starting From:  ${formatDate(
                                  proposalDate?.proposalOtherDate[0]?.date,
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
                  const serviceTypeId = item?.providerService?.serviceTypeId;
                  const proposalDate = item.appointmentProposal[0];
                  const isRecurring = item.appointmentProposal[0]?.isRecurring;
                  return (
                    <ReusableCard
                      key={item.opk}
                      item={{
                        name: changeTextLetter(
                          `${item.user.firstName} ${item.user.lastName}`,
                        )!,
                        image: item.user.image,
                        description: item?.providerService
                          ? serviceTypeId === 1 || serviceTypeId === 2
                            ? `Starting From:  ${formatDate(
                                proposalDate.proposalStartDate,
                                'iii LLL d',
                              )}`
                            : serviceTypeId === 3 || serviceTypeId === 5
                            ? isRecurring
                              ? `Starting From:  ${formatDate(
                                  proposalDate.recurringStartDate,
                                  'iii LLL d',
                                )}`
                              : `Starting From:  ${formatDate(
                                  proposalDate.proposalVisits[0].date,
                                  'iii LLL d',
                                )}`
                            : // : `Starting From:  ${formatDate(
                            //     proposalDate.proposalVisits[0].date,
                            //     'iii LLL d',
                            //   )}`
                            serviceTypeId === 4
                            ? isRecurring
                              ? `Starting From:  ${formatDate(
                                  proposalDate.recurringStartDate,
                                  'iii LLL d',
                                )}`
                              : `Starting From:  ${formatDate(
                                  proposalDate?.proposalOtherDate[0]?.date,
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
              ) : (
                <MessageNotSend
                  svg={<UpcomingSvg width={200} height={200} />}
                  title={'No messages in Pending inbox'}
                  description={
                    "You'll find messages here when you and sitter have a pending or accepted booking"
                  }
                />
              )}
            </View>
          )}

          <BottomSpacing />
          <BottomSpacing />
        </ScrollView>
      )}
      {/* {loading && <AppActivityIndicator visible={true} />} */}
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
