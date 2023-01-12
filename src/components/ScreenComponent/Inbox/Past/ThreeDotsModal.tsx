/* eslint-disable react-native/no-inline-styles */
import {Alert, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import IOSButton from '../../../UI/IOSButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {getAppointmentStatus} from '../../../../store/slices/Appointment/Inbox/User/Proposal/getAppointmentStatus';
import {getProviderApnt} from '../../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import BottomSpacing from '../../../UI/BottomSpacing';

const rejectEndpoint = '/appointment/proposal/reject/';
interface Props {
  setIsReviewModal: (value: boolean) => void;
  setIsThreeDotsModal: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
  isReviewed: any;
  appointmentId: any;
  opk: string;
}

const ThreeDotsModal: FC<Props> = props => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {user} = useAppSelector(state => state.whoAmI);
  const dispatch = useAppDispatch();
  const {request} = useApi(methods._put);
  const modalData = [
    {
      id: 1,
      name: 'Generate Report',
      icon: <MaterialIcons name="report" size={24} color={Colors.primary} />,
      screen: () => {
        if (user?.id === proposedServiceInfo?.userId) {
          Alert.alert(
            'Report',
            'Pet owner can not generate report for appointment',
          );
        } else if (
          proposedServiceInfo?.status !== 'PAID' &&
          user?.provider?.id === proposedServiceInfo?.providerId
        ) {
          Alert.alert(
            'Report',
            'You can only generate report once appointment is inprogress',
          );
        } else {
          props.setIsThreeDotsModal(false);
          navigation.navigate('ReportSlots', {
            opk: props?.opk,
          });
        }
      },
    },
    {
      id: 2,
      name: 'Report Summary',
      icon: <Entypo name="documents" size={24} color={Colors.primary} />,
      screen: () => {
        if (proposedServiceInfo?.status === 'PROPOSAL') {
          Alert.alert(
            'Report Summery',
            'You can not see report while appointment is in pending status',
          );
        } else {
          props.setIsThreeDotsModal(false);
          navigation.navigate('ShowAllReport', {
            screen: 'InboxNavigator',
            appointmentOpk: proposedServiceInfo?.appointmentOpk,
          });
        }
      },
    },

    {
      id: 3,
      name: props?.isReviewed?.length > 0 ? 'Already reviewed' : 'Review',
      icon: (
        <MaterialIcons name="rate-review" size={24} color={Colors.primary} />
      ),
      screen: () => {
        if (proposedServiceInfo?.status !== 'COMPLETED') {
          Alert.alert(
            'Review',
            'You can only review once you complete the appointment successfully',
          );
        } else {
          props?.isReviewed?.length === 0 && props?.setIsReviewModal(true);
          props?.isReviewed?.length === 0 && props?.setIsThreeDotsModal(false);
          props?.isReviewed?.length > 0 &&
            Alert.alert('Review', 'You have already reviewed');
        }
      },
    },
    {
      id: 4,
      name: 'Cancel Appointment',
      icon: <MaterialIcons name="cancel" size={24} color={Colors.primary} />,
      screen: () => {
        if (proposedServiceInfo?.status === 'COMPLETED') {
          Alert.alert(
            'Cancel Appointment',
            'Opps! This appointment is already completed, can not be cancelled',
          );
        } else {
          Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to decline this appointment',
            [
              {
                text: 'No',
                onPress: () => {},
              },
              {
                text: 'Yes',
                onPress: async () => {
                  const r = await request(rejectEndpoint + props.opk);
                  if (r.ok) {
                    dispatch(getAppointmentStatus('PROPOSAL'));
                    dispatch(getProviderApnt('PROPOSAL'));
                    navigation.navigate('InboxNavigator');
                  } else if (!r.ok) {
                    Alert.alert(r.data.message);
                  }
                },
              },
            ],
          );
        }
      },
    },
  ];
  return (
    <>
      <View>
        {modalData?.map(item => {
          return (
            <View key={item.id}>
              {(item.id === 1 || item.id === 3 || item.id === 4) &&
              (proposedServiceInfo.status === 'CANCELLED' ||
                proposedServiceInfo.status === 'REJECTED') ? null : (
                <AppTouchableOpacity
                  onPress={item.screen}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 20,
                  }}>
                  {item.icon}
                  <HeaderText
                    text={item.name}
                    textStyle={styles.descriptionText}
                  />
                </AppTouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <IOSButton
        containerStyle={styles.containerStyleSmall}
        onSelect={() => props.setIsThreeDotsModal(false)}
        textAlignment={{
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 100,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        titleStyle={{
          color: colors.lightText,
        }}
        title={'Close'}
      />
      <BottomSpacing />
    </>
  );
};

export default ThreeDotsModal;

const styles = StyleSheet.create({
  descriptionText: {
    paddingLeft: 10,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    marginTop: '10%',
  },
});
