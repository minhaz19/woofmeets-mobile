/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getInprogressApnt} from '../../../../store/slices/Appointment/Inbox/User/InProgress/getInprogressApnt';
import {getProviderInprogressApnt} from '../../../../store/slices/Appointment/Inbox/Provider/InProgress/getPInprogressApnt';
import changeTextLetter from '../../../common/changeTextLetter';
import BottomSpacing from '../../../UI/BottomSpacing';
import InboxLoader from '../../../../screens/Inbox/Loader/InboxLoader';
import {formatDate} from '../../../common/formatDate';
interface Props {
  statusType: string;
}
const ApprovedStatus = ({statusType}: Props) => {
  let navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {userInprogress, loading} = useAppSelector(
    state => state.userInprogress,
  );
  const {providerInprogress} = useAppSelector(
    state => state.providerInprogress,
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    statusType === 'USER' && (await dispatch(getInprogressApnt('PAID')));
    statusType === 'PROVIDER' &&
      (await dispatch(getProviderInprogressApnt('PAID')));
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
          {(userInprogress === null || userInprogress === undefined) &&
          statusType === 'USER' ? (
            <View style={styles.errorContainer}>
              <MessageNotSend
                svg={<UpcomingSvg width={200} height={200} />}
                title={'No messages in Approved inbox'}
                description={
                  " You'll find messages here when you and sitter have a inprogress booking"
                }
              />
            </View>
          ) : (
            <View style={styles.container}>
              {userInprogress !== null &&
              userInprogress !== undefined &&
              statusType === 'USER' ? (
                userInprogress?.map((item: any) => {
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
                                  proposalDate?.proposalVisits[0]?.date,
                                  'iii LLL d',
                                )}`
                            : // : `Starting From:  ${formatDate(
                            //     proposalDate?.proposalVisits[0]?.date,
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
              ) : providerInprogress !== null &&
                providerInprogress !== undefined &&
                statusType === 'PROVIDER' ? (
                providerInprogress?.map((item: any) => {
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
                  title={'No messages in Approved inbox'}
                  description={
                    "  You'll find messages here when you and sitter have a inprogress booking"
                  }
                />
              )}
            </View>
          )}

          <BottomSpacing />
          <BottomSpacing />
        </ScrollView>
      )}
    </>
  );
};

export default ApprovedStatus;

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
