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
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
import {getUserRejected} from '../../../../store/slices/Appointment/Inbox/User/Recjected/getUserRejected';
import {getUserCanceled} from '../../../../store/slices/Appointment/Inbox/User/Cancelled/getUserCancelled';
interface Props {
  statusType: string;
}
const DeclinedStatus = ({statusType}: Props) => {
  let navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [combineStatus, setCombineStatus] = useState<any>([]);
  const {userCancelled, loading} = useAppSelector(state => state.userCancelled);
  const {userRejected} = useAppSelector(state => state.userRejected);

  useEffect(() => {
    userRejected === null && dispatch(getUserRejected('REJECTED'));
    userCancelled === null && dispatch(getUserCanceled('CANCELLED'));
    setCombineStatus([...userCancelled, ...userRejected]);
  }, [dispatch, userCancelled, userRejected]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    userRejected === null && dispatch(getUserRejected('REJECTED'));
    userCancelled === null && dispatch(getUserCanceled('CANCELLED'));
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);
  console.log('asdfasdf', combineStatus);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {combineStatus === null && combineStatus !== undefined ? (
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
            {combineStatus !== null && combineStatus !== undefined ? (
              combineStatus.map((item: any) => {
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
