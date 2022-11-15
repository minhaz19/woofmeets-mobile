/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getUserCanceled} from '../../../../store/slices/Appointment/Inbox/User/Cancelled/getUserCancelled';
import {getProviderCancelled} from '../../../../store/slices/Appointment/Inbox/Provider/Cancelled/getProviderCancelled';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import changeTextLetter from '../../../common/changeTextLetter';
import {getProviderProposal} from '../../../../store/slices/Appointment/Proposal/getProviderProposal';
import RefundDetails from '../Details/RefundDetails';
import InboxLoader from '../../../../screens/Inbox/Loader/InboxLoader';
import {formatDate} from '../../../common/formatDate';
interface Props {
  statusType: string;
}
const DeclinedStatus = ({statusType}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {userCancelled, loading} = useAppSelector(state => state.userCancelled);
  const {providerCancelled} = useAppSelector(state => state.providerCancelled);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    statusType === 'USER' && (await dispatch(getUserCanceled('REJECTED')));
    statusType === 'PROVIDER' &&
      (await dispatch(getProviderCancelled('REJECTED')));

    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, [statusType]);
  console.log('delcined ', userCancelled, providerCancelled);
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
          {(statusType === 'USER' &&
            userCancelled?.length === 0 &&
            userCancelled !== undefined) ||
          (statusType === 'PROVIDER' &&
            providerCancelled?.length === 0 &&
            providerCancelled !== undefined) ? (
            <View style={styles.errorContainer}>
              <MessageNotSend
                svg={<UpcomingSvg width={200} height={200} />}
                title={'No messages in Delined inbox'}
                description={
                  " You'll find messages here when you or sitter have cancelled or reject a booking"
                }
              />
            </View>
          ) : (
            <View style={styles.container}>
              {statusType === 'USER' &&
              userCancelled !== null &&
              userCancelled !== undefined ? (
                userCancelled.map((item: any) => {
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
                                  proposalDate.proposalOtherDate[0].date,

                                  'iii LLL d',
                                )}`
                            : ''
                          : 'No Mesaegs fonnd',
                        boardingTime: item?.providerService?.serviceType?.name,
                        status: item.status,
                      }}
                      buttonStyles={Colors.primary}
                      handlePress={() => {
                        setIsVisible(true);
                        dispatch(getProviderProposal(item.opk));
                      }}
                    />
                  );
                })
              ) : statusType === 'PROVIDER' &&
                providerCancelled !== null &&
                providerCancelled !== undefined ? (
                providerCancelled.map((item: any) => {
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
                                  proposalDate.proposalOtherDate[0].date,

                                  'iii LLL d',
                                )}`
                            : ''
                          : 'No Mesaegs fonnd',
                        boardingTime: item?.providerService?.serviceType?.name,
                        status: item.status,
                      }}
                      buttonStyles={Colors.primary}
                      handlePress={() => {
                        setIsVisible(true);
                        dispatch(getProviderProposal(item.opk));
                      }}
                    />
                  );
                })
              ) : (
                // handlePress={() => setIsVisible(true)}
                <MessageNotSend
                  svg={<UpcomingSvg width={200} height={200} />}
                  title={'No messages in Delined inbox'}
                  description={
                    " You'll find messages here when you or sitter have cancelled or reject a booking"
                  }
                />
              )}
            </View>
          )}

          <BottomSpacingNav />
        </ScrollView>
      )}

      <BottomHalfModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}>
        <RefundDetails setIsDetailsModal={setIsVisible} />
      </BottomHalfModal>
    </>
  );
};

export default DeclinedStatus;

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
