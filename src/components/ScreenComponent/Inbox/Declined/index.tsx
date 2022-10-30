import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
import {getUserCanceled} from '../../../../store/slices/Appointment/Inbox/User/Cancelled/getUserCancelled';
import {getProviderCancelled} from '../../../../store/slices/Appointment/Inbox/Provider/Cancelled/getProviderCancelled';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import Details from '../Details/Details';
import {format} from 'date-fns';
import changeTextLetter from '../../../common/changeTextLetter';
interface Props {
  statusType: string;
}
const DeclinedStatus = ({statusType}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [combineStatusUser, setCombineStatusUser] = useState<any>([]);
  const [combineStatusProvider, setCombineStatusProvider] = useState<any>([]);
  const {userCancelled, loading} = useAppSelector(state => state.userCancelled);
  const {providerCancelled} = useAppSelector(state => state.providerCancelled);
  useEffect(() => {
    if (statusType === 'USER') {
      dispatch(getUserCanceled('CANCELLED'));
      userCancelled && setCombineStatusUser([...userCancelled]);
    } else if (statusType === 'PROVIDER') {
      dispatch(getProviderCancelled('CANCELLED'));
      providerCancelled && setCombineStatusProvider([...providerCancelled]);
    }
  }, [statusType]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    if (statusType === 'USER') {
      dispatch(getUserCanceled('CANCELLED'));
    } else {
      dispatch(getProviderCancelled('CANCELLED'));
    }
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
        {(statusType === 'USER' &&
          combineStatusUser.length === 0 &&
          combineStatusUser !== undefined) ||
        (statusType === 'PROVIDER' &&
          combineStatusProvider.length === 0 &&
          combineStatusProvider !== undefined) ? (
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
            {statusType === 'USER' &&
            combineStatusUser !== null &&
            combineStatusUser !== undefined ? (
              combineStatusUser.map((item: any) => {
                const serviceTypeId = item?.providerService?.serviceTypeId;
                const proposalDate = item.appointmentProposal[0];
                const isRecurring = item.appointmentProposal[0]?.isRecurring;
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: changeTextLetter(
                        `${item.provider.user.firstName} ${item.provider.user.lastName}`,
                      ),
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
                    handlePress={() => setIsVisible(true)}
                  />
                );
              })
            ) : statusType === 'PROVIDER' &&
              combineStatusProvider !== null &&
              combineStatusProvider !== undefined ? (
              combineStatusProvider.map((item: any) => {
                const serviceTypeId = item?.providerService?.serviceTypeId;
                const proposalDate = item.appointmentProposal[0];
                const isRecurring = item.appointmentProposal[0]?.isRecurring;
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: changeTextLetter(
                        `${item.user.firstName} ${item.user.lastName}`,
                      ),
                      image: item.user.image,
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
                    handlePress={() => setIsVisible(true)}
                  />
                );
              })
            ) : (
              // handlePress={() => setIsVisible(true)}
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
      <BottomHalfModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}>
        <Details setIsDetailsModal={setIsVisible} />
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
