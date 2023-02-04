/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import changeTextLetter from '../../../common/changeTextLetter';
import {convertToLocalTZ} from '../../../common/formatDate';
import Colors from '../../../../constants/Colors';
import MessageNotSend from '../utils/Common/MessageNotSend';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import BottomSpacing from '../../../UI/BottomSpacing';
import {useNavigation} from '@react-navigation/native';
import FetchMoreLoader from '../../../common/Loaders/FetchMoreLoader';
interface Props {
  statusType: string;
  handleLoadMore: () => void;
  loading: boolean;
  data: any[];
  onRefresh: () => void;
  // refreshing: boolean;
  pendingReview: boolean;
}

const ChatList = ({
  handleLoadMore,
  loading,
  data,
  statusType,
  onRefresh,
  pendingReview,
}: Props) => {
  const navigation = useNavigation<any>();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROPOSAL':
        return ['#FAEFFE', '#B17CD5'];
      case 'ACCEPTED':
        return [Colors.primaryLight, Colors.primaryDeep];
      case 'PAID':
        return ['#E3FFF6', '#06CB8F'];
      case 'COMPLETED':
        return ['#D8F2FB', '#05B1F1'];
      case 'REJECTED':
        return ['#FBE4D8', '#FB341E'];
      case 'CANCELLED':
        return ['#FBE4D8', '#FB341E'];
    }
  };

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          const serviceTypeId = item?.providerService?.serviceTypeId;
          const proposalDate = item.appointmentProposal[0];
          const isRecurring = item.appointmentProposal[0]?.isRecurring;
          const timezone = item?.providerTimeZone;
          const providerName = `${item?.provider?.user?.firstName} ${item?.provider?.user?.lastName}`;
          const userName = `${item.user.firstName} ${item.user.lastName}`;
          return (
            <ReusableCard
              key={item.opk}
              item={{
                name: changeTextLetter(
                  statusType === 'USER'
                    ? providerName.slice(0, 15) +
                        (providerName.length > 15 ? '...' : '')
                    : userName.slice(0, 15) +
                        (userName.length > 15 ? '...' : ''),
                )!,
                image:
                  statusType === 'USER'
                    ? item?.provider?.user?.image
                    : item.user.image,
                description: item?.providerService
                  ? serviceTypeId === 1 || serviceTypeId === 2
                    ? `Start Date:  ${convertToLocalTZ(
                        proposalDate.proposalStartDate,
                        timezone,
                        'DD ddd MMM YYYY',
                      )}`
                    : serviceTypeId === 3 || serviceTypeId === 5
                    ? isRecurring
                      ? `Start Date:  ${convertToLocalTZ(
                          proposalDate.recurringStartDate,
                          timezone,
                          'DD ddd MMM YYYY',
                        )}`
                      : `Start Date:  ${convertToLocalTZ(
                          proposalDate.proposalVisits[0]?.date,
                          timezone,
                          'DD ddd MMM YYYY',
                        )}`
                    : serviceTypeId === 4
                    ? isRecurring
                      ? `Start Date:  ${convertToLocalTZ(
                          proposalDate.recurringStartDate,
                          timezone,
                          'DD ddd MMM YYYY',
                        )}`
                      : `Start Date:  ${convertToLocalTZ(
                          proposalDate?.proposalOtherDate[0]?.date,
                          timezone,
                          'DD ddd MMM YYYY',
                        )}`
                    : ''
                  : 'No Mesaegs fonnd',
                boardingTime: item?.providerService?.serviceType?.name,
                status: item.status,
                roomId: item.messageGroupId,
              }}
              statusColor={getStatusColor(item.status)!}
              pendingReview={pendingReview}
              handlePress={() =>
                navigation.navigate('ActivityScreen', {
                  appointmentOpk: item.opk,
                  messageGroupId: item.messageGroupId,
                  showReview: pendingReview ? true : false,
                  pendingReview: pendingReview ? true : false,
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
              <View
                style={{
                  marginTop: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <FetchMoreLoader
                  width={Platform.OS === 'ios' ? '20%' : '25%'}
                />
              </View>
              <BottomSpacing />
              <BottomSpacing />
              <BottomSpacing />
              <BottomSpacing />
            </>
          ) : (
            <>
              <BottomSpacing />
              <BottomSpacing />
              <BottomSpacing />
              <BottomSpacing />
            </>
          )
        }
        ListEmptyComponent={() => {
          return (
            <View style={styles.errorContainer}>
              <MessageNotSend
                svg={<UpcomingSvg width={200} height={200} />}
                title={'No messages in Appointment inbox'}
                description={
                  "You'll find messages here when you and sitter have a appointment booking"
                }
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 200,
    paddingTop: 100,
  },
});
