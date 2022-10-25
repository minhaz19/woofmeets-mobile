import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
interface Props {
  statusType: string;
}
const ApprovedStatus = ({statusType}: Props) => {
  let navigation = useNavigation<any>();

  useEffect(() => {}, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {true && (statusType === 'USER' || statusType === 'PROVIDER') ? (
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
            {/* <FilterByDateAndActivity
              handleActivity={() => {}}
              handleDate={() => {}}
            /> */}
            {true ? (
              []?.map((item: any) => {
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
            ) : true && statusType === 'PROVIDER' ? (
              []?.map((item: any) => {
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
            ) : statusType === 'PROVIDER' ? (
              []?.map((item: any) => {
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
