import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ReusableCard from '../utils/Common/ReusableCard';
import {UpcomingSvg} from '../utils/SvgComponent/SvgComponent';
import MessageNotSend from '../utils/Common/MessageNotSend';
import Colors from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';
import BottomSpacingNav from '../../../UI/BottomSpacingNav';
import { upcomingInboxFetch } from '../../../../store/slices/Appointment/appointment';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import TitleText from '../../../common/text/TitleText';

const UpcomingMessage = () => {
  let navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {upcomingAppointment, error, upcomingStatus} = useAppSelector(state => state.appointment);
  // console.log(upcomingAppointment, error, upcomingStatus);

  useEffect(() => {
    dispatch(
      upcomingInboxFetch({
        statusId: 'PROPOSAL'
      })
    );
  }, [dispatch]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(upcomingInboxFetch({statusId: 'PROPOSAL'}));
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {!upcomingAppointment && error ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, paddingTop: 100}} >
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
            {upcomingAppointment?.length > 0 ? (
              upcomingAppointment?.map((item) => {
                return (
                  <ReusableCard
                    key={item.opk}
                    item={{
                      name: `${item.provider.user.firstName} ${item.provider.user.lastName}`,
                      image: item.provider.user.image,
                      description: item.appointmentProposal[0].firstMessage,
                      boardingTime: `${item.appointmentProposal[0].proposalStartDate} to ${item.appointmentProposal[0].proposalEndDate}`,
                      pickUpStartTime: item.appointmentProposal[0].pickUpStartTime,
                      status: item.status,
                    }}
                    buttonStyles={Colors.primary}
                    handlePress={() => navigation.navigate('ActivityScreen')}
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
  );
};

export default UpcomingMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '2%',
  },
});
