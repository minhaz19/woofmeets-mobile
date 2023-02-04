/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  AppStateStatus,
  AppState,
} from 'react-native';
import React, {useState, useEffect, memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../common/text/TitleText';
import Colors from '../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
// import {getAppointmentStatus} from '../../../store/slices/Appointment/Inbox/User/Proposal/getAppointmentStatus';
// import {getProviderApnt} from '../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
import RecurringModal from './components/RecurringModal';
import {setBillingId} from '../../../store/slices/Appointment/Proposal/providerProposalSlice';
import changeTextLetter from '../../common/changeTextLetter';
import {convertToLocalTZ, formatDate} from '../../common/formatDate';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
import {getProviderServices} from '../../../store/slices/Appointment/ProviderServices/getProviderServices';
// import {msgUrl} from '../../../utils/helpers/httpRequest';
// import {io} from 'socket.io-client';
import {
  PERMISSIONS,
  request as requestPermission,
} from 'react-native-permissions';
import {socket} from '../../../../App';
import {getAppointmentCard} from '../../../store/slices/Appointment/AppointmentCard/getAppointmentCard';
// import {
//   dateEquOrPassed,
//   datePassed,
//   isComing,
//   isDateNotFound,
//   isSameDate,
// } from '../../common/Dates/datesFunc';
const acceptEndpoint = '/appointment/accept/proposal/';
const completeEndpoint = '/appointment/complete/';
const rejectEndpoint = '/appointment/proposal/reject/';
// const cardEndpoint = '/appointment/card/all-dates/';
const startEndpoint = '/appointment/card/start-appointment/';
const stopEndpoint = '/appointment/card/stop-appointment/';
const checkReport = '/appointment/card/check/';
const ActivityHeader = (props: {
  setIsDetailsModal: (arg0: boolean) => void;
  setIsThreeDotsModal: (arg0: boolean) => void;
  setVisitId: any;
  opk?: any;
  proposedServiceInfo?: any;
  AppointmentTab?: boolean;
}) => {
  let navigation = useNavigation<any>();
  const {colors} = useTheme();
  const {request: getRequest, loading: getLoading} = useApi(methods._get);
  const {request, loading: putLoading} = useApi(methods._put);
  const {request: ssReqest, loading} = useApi(methods._put);
  const dispatch = useAppDispatch();
  const [regenerateModal, setRegenerateModal] = useState(false);
  const {appointmentCard} = useAppSelector(state => state.appointmentCard);
  const [otherDay, setOtherDay] = useState<any>({});
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const [currentDate, setCurrentDate] = useState<any>({});
  const [appointmentStart, setAppointmentStart] = useState('START');

  const [allDates, setAllDates] = useState<any>([]);
  const user = useAppSelector(state => state.whoAmI);
  const timezone = proposedServiceInfo?.providerTimeZone;
  const today = new Date();
  function isSameDate(date: string) {
    if (
      today.toDateString() === new Date(date?.replace(/-/g, '/')).toDateString()
    ) {
      return true;
    }
    return false;
  }
  const lessThenLastDate = (date: any) => {
    return today < new Date(date?.replace(/-/g, '/'));
  };
  const datePassed = (date: any) => {
    return new Date(date?.replace(/-/g, '/')) < today;
  };
  const dateEquOrPassed = (date: any) => {
    return today >= new Date(date?.replace(/-/g, '/'));
  };
  const isComing = (date: any) => {
    return new Date(date?.replace(/-/g, '/')) > today;
  };
  const isDateNotFound = (allD: any) => {
    return (
      allD?.findIndex(
        (f: any) => new Date(f.localDate?.replace(/-/g, '/')) === today,
      ) === -1
    );
  };
  const handleAccept = async () => {
    const result = await request(acceptEndpoint + props.opk);
    if (result.ok) {
      dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      // dispatch(getAppointmentStatus('PROPOSAL'));
      // dispatch(getProviderApnt('PROPOSAL'));
      navigation.navigate('InboxNavigator');
    } else {
      // Alert.alert(result?.data?.message);
    }
  };
  const handleRegenerate = async () => {
    setRegenerateModal(true);
  };
  const handleComplete = () => {
    if (
      (proposedServiceInfo.serviceTypeId === 1 ||
        proposedServiceInfo.serviceTypeId === 2) &&
      !dateEquOrPassed(allDates[allDates?.length - 1]?.localDate)
      // (!datePassed(allDates[allDates?.length - 1]?.localDate) ||
      //   !isSameDate(allDates[allDates?.length - 1]?.localDate))
    ) {
      Alert.alert(
        'Complete Appointment',
        `You can not complete appointment before ${formatDate(
          allDates[allDates?.length - 1]?.localDate,
          'iii LLL d yyyy',
        )}`,
      );
    } else if (
      (proposedServiceInfo.serviceTypeId !== 1 ||
        proposedServiceInfo.serviceTypeId !== 2) &&
      !dateEquOrPassed(allDates[allDates?.length - 1]?.localDate)
    ) {
      Alert.alert(
        `You can not complete appointment before ${formatDate(
          allDates[allDates?.length - 1]?.localDate,
          'iii LLL d yyyy',
        )}`,
      );
    } else {
      Alert.alert(
        'Complete Appointment',
        'Are you sure you want to Complete and close this appointment',
        [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: async () => {
              const r = await request(completeEndpoint + props.opk);
              if (r.ok) {
                // dispatch(getAppointmentStatus('PAID'));
                // dispatch(getProviderApnt('PAID'));
                const payloadData: any = {
                  sender: user?.userId,
                  opk: proposedServiceInfo?.appointmentOpk,
                  group: proposedServiceInfo?.messageGroupId,
                  content: `${proposedServiceInfo.userName} has successfully ended the appointment`,
                  createdAt: new Date(),
                };
                socket.emit('send-message', payloadData);
                navigation.navigate('InboxNavigator');
              } else if (!r.ok) {
                Alert.alert(r.data.message);
              }
            },
          },
        ],
      );
    }
  };
  const handleReject = async () => {
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
              // dispatch(getAppointmentStatus('PROPOSAL'));
              // dispatch(getProviderApnt('PROPOSAL'));
              navigation.navigate('InboxNavigator');
            } else if (!r.ok) {
              Alert.alert(r.data.message);
            }
          },
        },
      ],
    );
  };

  const handleProfile = async () => {
    if (user?.userId === proposedServiceInfo.userId) {
      await dispatch(getProviderProfile(proposedServiceInfo?.providerOpk));
      navigation.navigate('ProviderProfile', {
        providerOpk: proposedServiceInfo?.providerOpk,
      });
      await dispatch(getProviderServices(proposedServiceInfo?.providerOpk));
    }
  };

  useEffect(() => {
    if (appointmentCard?.length > 0) {
      setAllDates(appointmentCard);
      const findData = appointmentCard?.find(
        (d: any) =>
          (isSameDate(d?.localDate) &&
            (d?.startTime === null || d?.stopTime === null)) ||
          d?.startTime === null ||
          d?.stopTime === null,
      );
      if (findData === undefined) {
        const findOtherDate = appointmentCard?.find(
          (d: any) =>
            !isSameDate(d?.localDate) &&
            isComing(d?.localDate) &&
            d?.startTime === null,
        );
        setOtherDay(findOtherDate);
        setCurrentDate({});
        props.setVisitId(findOtherDate?.id);
      } else if (
        findData &&
        findData !== undefined &&
        (isSameDate(findData.localDate) ||
          datePassed(findData.localDate) ||
          isComing(findData.localDate))
      ) {
        setCurrentDate(findData);
        setOtherDay({});
        props.setVisitId(findData.id);
      } else {
    
      }
    }
  }, [appointmentCard]);
  useEffect(() => {
    if (
      proposedServiceInfo?.serviceTypeId === 1 ||
      proposedServiceInfo?.serviceTypeId === 2
    ) {
      if (
        allDates?.[0]?.startTime === null &&
        allDates?.[0]?.stopTime === null &&
        isComing(allDates?.[0]?.localDate)
      ) {
        setAppointmentStart('UPCOMING');
      } else if (
        (currentDate?.startTime === null &&
          isSameDate(currentDate?.localDate)) ||
        (currentDate?.startTime === null &&
          new Date(currentDate?.localDate) < today)
        // (allDates?.[0]?.startTime === null &&
        //   isSameDate(allDates?.[0]?.localDate)) ||
        // (allDates?.[0]?.startTime === null &&
        //   new Date(allDates?.[0]?.localDate) < today)
      ) {
        setAppointmentStart('START');
        // setCurrentDate(allDates?.[0]);
      } else if (
        allDates?.[0]?.startTime !== null &&
        allDates?.[1]?.stopTime === null &&
        lessThenLastDate(allDates?.[1]?.localDate)
      ) {
        setAppointmentStart('INPROGRESS');
      } else if (
        (allDates?.[1]?.stopTime === null &&
          allDates?.[0]?.startTime !== null &&
          isSameDate(allDates[allDates?.length - 1]?.localDate)) ||
        (allDates?.[1]?.stopTime === null &&
          allDates?.[0]?.startTime !== null &&
          datePassed(allDates?.[1]?.localDate))
      ) {
        setAppointmentStart('STOP');
      }
      // else if (
      //   allDates?.[0]?.startTime === null &&
      //   datePassed(allDates[allDates?.length - 1]?.localDate)
      // ) {
      //   setAppointmentStart('PAST');
      //   // setAppointmentStart('ENDED');
      // }
      else if (
        allDates?.[0]?.startTime !== null &&
        allDates?.[1]?.stopTime !== null
      ) {
        setAppointmentStart('COMPLETED');
      } else if (
        isDateNotFound(allDates) &&
        allDates?.[0]?.startTime !== null &&
        allDates?.[1]?.stopTime !== null
      ) {
        setAppointmentStart('NOAPPOINTMENT');
      } else {
        // setAppointmentStart('PAST');
        // setAppointmentStart('NOAPPOINTMENT');
      }
    } else {
      if (
        (currentDate?.startTime === null && isComing(currentDate?.localDate)) ||
        (otherDay?.startTime === null && isComing(otherDay?.localDate))
      ) {
        setAppointmentStart('UPCOMING');
      } else if (
        currentDate?.startTime === null &&
        (isSameDate(currentDate?.localDate) ||
          datePassed(currentDate?.localDate))
      ) {
        setAppointmentStart('START');
      } else if (
        currentDate?.startTime !== null &&
        currentDate?.stopTime === null &&
        (isSameDate(currentDate?.localDate) ||
          datePassed(currentDate?.localDate))
      ) {
        setAppointmentStart('STOP');
      } else if (isDateNotFound(allDates)) {
        setAppointmentStart('NOAPPOINTMENT');
      }
      // else if (
      //   (currentDate?.startTime !== null &&
      //     datePassed(currentDate?.localDate)) ||
      //   (currentDate?.startTime === null && datePassed(currentDate?.localDate))
      // ) {
      //   setAppointmentStart('PAST');
      // } else {
      //   // setAppointmentStart('NOAPPOINTMENT');
      // }
    }
  }, [
    allDates,
    appointmentStart,
    today,
    currentDate,
    otherDay,
    proposedServiceInfo?.serviceTypeId,
  ]);

  const handleStart = async () => {
    Alert.alert(
      'Start Appointment',
      'Are you sure you want to start this appointment',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: async () => {
            const startRes = await ssReqest(startEndpoint + currentDate?.id, {
              startTime: new Date().toISOString(),
            });
            if (startRes.ok) {
              setCurrentDate(startRes?.data?.data);
              setAppointmentStart('STOP');
              const payloadData: any = {
                sender: user?.userId,
                group: proposedServiceInfo?.messageGroupId,
                opk: proposedServiceInfo?.appointmentOpk,
                content: `${proposedServiceInfo.providerName} has started appointment for ${currentDate.localDate}`,
                createdAt: new Date(),
              };
              socket.emit('send-message', payloadData);
              if (proposedServiceInfo.serviceTypeId === 5) {
                navigation.navigate('ReportCardInitial', {
                  screen: 'InboxNavigator',
                  appointmentId: currentDate?.id,
                });
              }
            }
          },
        },
      ],
    );
  };

  const handleStop = async () => {
    Alert.alert(
      'Complete Appointment',
      'Are you sure you want to complete this appointment',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: async () => {
            const stopId =
              proposedServiceInfo?.serviceTypeId === 1 ||
              proposedServiceInfo?.serviceTypeId === 2
                ? allDates?.[1].id
                : currentDate?.id;
            const stopRes = await ssReqest(stopEndpoint + stopId, {
              stopTime: new Date().toISOString(),
            });

            if (stopRes.ok) {
              const payloadData: any = {
                sender: user?.userId,
                group: proposedServiceInfo?.messageGroupId,
                opk: proposedServiceInfo?.appointmentOpk,
                content: `${proposedServiceInfo.providerName} has completed appointment for ${currentDate.localDate}`,
                createdAt: new Date(),
              };
              socket.emit('send-message', payloadData);
              // setAppointmentStart('START');
              dispatch(getAppointmentCard(props.opk));

              const result = await getRequest(
                `${
                  checkReport +
                  stopRes?.data?.data.appointmentId +
                  '/' +
                  stopRes?.data?.data.id
                }`,
              );
              if (result?.ok && !result.data.data.cardFound) {
                navigation.navigate('GenerateReport', {
                  screen: 'InboxNavigator',
                  reportInfo: stopRes.data.data,
                });
              } else if (result?.ok && result?.data?.data.cardFound) {
                Alert.alert(
                  'Appointment completed and you have already generated report for this particular appointment',
                );
              }

              setCurrentDate(stopRes?.data?.data);
            }
          },
        },
      ],
    );
  };
  const handleStatus = () => {
    if (appointmentStart === 'UPCOMING') {
      Alert.alert('Appointment Status!', 'You appointment is coming soon');
    } else if (appointmentStart === 'NOAPPOINTMENT') {
      Alert.alert(
        'Appointment Status!',
        'You have no appointment on this particular day',
      );
    } else if (appointmentStart === 'INPROGRESS') {
      Alert.alert('Appointment Status!', 'Your appointment is in progress');
    } else if (appointmentStart === 'ENDED') {
      Alert.alert(
        'Appointment Status!',
        'Your appointment date has already been passed.',
      );
    } else if (appointmentStart === 'PAST') {
      Alert.alert('Appointment Status!', 'Your appointment has been passed.');
    } else if (appointmentStart === 'COMPLETED') {
      Alert.alert(
        'Appointment Status!',
        'Your have completed appointment for your side.',
      );
    } else {
      Alert.alert('No sure about the status');
    }
  };
  return (
    <>
      <View style={[styles.container, {borderColor: colors.borderColor}]}>
        <View style={styles.containerInner}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity
              style={styles.leftContainer}
              onPress={() => {
                if (props?.AppointmentTab) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Inbox', {
                    back: true,
                    screen: 'InboxNavigator',
                  });
                }
              }}>
              <Ionicons
                name="ios-chevron-back"
                size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
                style={styles.iconStyle}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <AppTouchableOpacity
              onPress={handleProfile}
              style={styles.headerTitleContainer}>
              <View style={styles.titleMargin}>
                <HeaderText
                  text={
                    proposedServiceInfo?.providerId === user?.user?.provider?.id
                      ? changeTextLetter(proposedServiceInfo?.userName)
                      : changeTextLetter(proposedServiceInfo?.providerName)
                  }
                />
                <DescriptionText
                  text={
                    proposedServiceInfo?.serviceTypeId === 1 ||
                    proposedServiceInfo?.serviceTypeId === 2
                      ? proposedServiceInfo?.serviceName +
                        ' from:  ' +
                        convertToLocalTZ(
                          proposedServiceInfo.proposalStartDate,
                          timezone,
                          'DD ddd MMM YYYY',
                        )
                      : proposedServiceInfo?.serviceTypeId === 3 ||
                        proposedServiceInfo?.serviceTypeId === 5
                      ? proposedServiceInfo?.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.recurringStartDate,
                            timezone,
                            'DD ddd MMM YYYY',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            timezone,
                            'DD ddd MMM YYYY',
                          )
                      : proposedServiceInfo?.serviceTypeId === 4
                      ? proposedServiceInfo.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.recurringStartDate,
                            timezone,
                            'DD ddd MMM YYYY',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            timezone,
                            'DD ddd MMM YYYY',
                          )
                      : ''
                  }
                />
              </View>
            </AppTouchableOpacity>
          </View>
          {proposedServiceInfo?.status === 'CANCELLED' ||
          proposedServiceInfo?.status === 'REJECTED' ? null : (
            <TouchableOpacity
              style={styles.leftContainer}
              onPress={() => props.setIsThreeDotsModal(true)}>
              <Entypo
                name="dots-three-vertical"
                size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
                color={Colors.primary}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.innerTwo}>
          <View style={styles.buttonContainer}>
            {((proposedServiceInfo?.proposedBy === 'USER' &&
              proposedServiceInfo?.status === 'ACCEPTED') ||
              (proposedServiceInfo?.proposedBy === 'PROVIDER' &&
                (proposedServiceInfo?.status === 'ACCEPTED' ||
                  proposedServiceInfo?.status === 'PROPOSAL'))) &&
            proposedServiceInfo?.userId === user?.user?.id ? (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  onPress={async () => {
                    if (
                      proposedServiceInfo?.proposedBy === 'PROVIDER' &&
                      proposedServiceInfo?.status !== 'ACCEPTED'
                    ) {
                      const r = await request(
                        acceptEndpoint + proposedServiceInfo.appointmentOpk,
                      );
                      if (r.ok) {
                        await dispatch(
                          getProviderProposal(
                            proposedServiceInfo.appointmentOpk,
                          ),
                        );
                        proposedServiceInfo?.billing[0]?.id &&
                          (dispatch(
                            setBillingId(proposedServiceInfo.billing[0].id),
                          ),
                          navigation.navigate('Checkout'));
                      }
                    } else {
                      dispatch(
                        getProviderProposal(proposedServiceInfo.appointmentOpk),
                      );
                      dispatch(setBillingId(proposedServiceInfo.billing[0].id));
                      navigation.navigate('Checkout');
                    }
                  }}>
                  <TitleText
                    text={
                      proposedServiceInfo?.proposedBy === 'PROVIDER' &&
                      proposedServiceInfo?.status !== 'ACCEPTED'
                        ? putLoading
                          ? 'loading'
                          : 'Accept'
                        : proposedServiceInfo?.status === 'ACCEPTED'
                        ? 'Pay Now'
                        : 'Pay'
                    }
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
                {(proposedServiceInfo?.status === 'PROPOSAL' ||
                  proposedServiceInfo?.status === 'ACCEPTED') && (
                  <View style={styles.divider} />
                )}
              </>
            ) : proposedServiceInfo?.proposedBy === 'USER' &&
              proposedServiceInfo?.status === 'PROPOSAL' &&
              proposedServiceInfo?.providerId === user?.user?.provider?.id ? (
              <>
                <TouchableOpacity onPress={handleAccept}>
                  <TitleText
                    text={putLoading ? 'loading' : 'Accept'}
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            ) : proposedServiceInfo?.status === 'ACCEPTED' ? (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  onPress={() => Alert.alert('Proposal Already Accepted!')}>
                  <TitleText
                    text="Accepted"
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            ) : proposedServiceInfo?.status === 'PAID' ? (
              <>
                {proposedServiceInfo?.providerId ===
                  user?.user?.provider?.id && (
                  <>
                    <TouchableOpacity
                      disabled={false}
                      // style={{width: SCREEN_WIDTH / 5}}
                      onPress={
                        // handleStart
                        appointmentStart === 'STOP'
                          ? handleStop
                          : appointmentStart === 'START'
                          ? handleStart
                          : handleStatus
                      }>
                      <TitleText
                        text={
                          loading || getLoading
                            ? 'loading...'
                            : appointmentStart === 'START'
                            ? `Start Appointment - ${currentDate.localDate}`
                            : appointmentStart === 'STOP'
                            ? 'Complete Appointment'
                            : appointmentStart === 'ENDED'
                            ? 'Appointment Ended'
                            : appointmentStart === 'UPCOMING'
                            ? 'Coming Soon'
                            : appointmentStart === 'NOAPPOINTMENT'
                            ? 'No Appointment'
                            : appointmentStart === 'INPROGRESS'
                            ? 'In Progress'
                            : appointmentStart === 'PAST'
                            ? 'Past Appointment'
                            : appointmentStart === 'COMPLETED'
                            ? 'Appointment Completed'
                            : 'In Progress'
                        }
                        textStyle={{
                          ...styles.textStyle,
                          textAlign: 'center',
                          color: Colors.light.background,
                          fontWeight: 'bold',
                        }}
                      />
                    </TouchableOpacity>
                  </>
                )}
                {!proposedServiceInfo?.isRecurring &&
                  proposedServiceInfo?.userId === user?.user?.id && (
                    <>
                      <TouchableOpacity
                        // style={{width: SCREEN_WIDTH / 5}}
                        onPress={() =>
                          navigation.navigate('AppointmentSuccess')
                        }>
                        <TitleText
                          text={`${
                            proposedServiceInfo?.userId === user?.user?.id
                              ? 'Paid'
                              : 'Paid Successfully'
                          }`}
                          textStyle={{
                            ...styles.textStyle,
                            textAlign: 'center',
                            color: Colors.light.background,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.divider} />
                      <TouchableOpacity
                        // style={{width: SCREEN_WIDTH / 5}}
                        disabled={putLoading}
                        onPress={handleComplete}>
                        <TitleText
                          text={putLoading ? 'loading...' : 'Complete'}
                          textStyle={{
                            ...styles.textStyle,
                            textAlign: 'center',
                            color: Colors.light.background,
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                {proposedServiceInfo?.userId === user?.user?.id &&
                  proposedServiceInfo?.isRecurring && (
                    <>
                      {proposedServiceInfo?.isRecurring && (
                        <>
                          <TouchableOpacity
                            // style={{width: '100%'}}
                            onPress={() =>
                              navigation.navigate('AppointmentSuccess')
                            }>
                            <TitleText
                              text={`${
                                proposedServiceInfo?.userId === user?.user?.id
                                  ? 'Paid'
                                  : 'Paid Successfully'
                              }`}
                              textStyle={{
                                ...styles.textStyle,

                                textAlign: 'center',
                                width: '100%',
                                // backgroundColor: 'red',
                                color: Colors.light.background,
                              }}
                            />
                          </TouchableOpacity>
                          <View style={styles.divider} />
                          <TouchableOpacity
                            // style={{width: SCREEN_WIDTH / 5}}
                            onPress={handleRegenerate}>
                            <TitleText
                              text="Regenerate"
                              textStyle={{
                                ...styles.textStyle,
                                textAlign: 'center',
                                color: Colors.light.background,
                              }}
                            />
                          </TouchableOpacity>
                        </>
                      )}
                      <View style={styles.divider} />
                      <TouchableOpacity
                        // style={{width: SCREEN_WIDTH / 5}}
                        disabled={putLoading}
                        onPress={handleComplete}>
                        <TitleText
                          text={putLoading ? 'loading..' : 'Complete'}
                          textStyle={{
                            ...styles.textStyle,
                            textAlign: 'center',
                            color: Colors.light.background,
                          }}
                        />
                      </TouchableOpacity>
                    </>
                  )}
              </>
            ) : proposedServiceInfo?.status === 'COMPLETED' ? (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  onPress={() => {}}>
                  <TitleText
                    text={'Completed'}
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
              </>
            ) : proposedServiceInfo?.status === 'CANCELLED' ? (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  disabled
                  onPress={() => {}}>
                  <TitleText
                    text={'Appointment Cancelled'}
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
              </>
            ) : proposedServiceInfo?.status === 'REJECTED' ? (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  disabled
                  onPress={() => {}}>
                  <TitleText
                    text={'Appointment Rejected'}
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
              </>
            ) : null}
            {proposedServiceInfo?.status === 'PROPOSAL' && (
              <>
                <TouchableOpacity
                  // style={{width: SCREEN_WIDTH / 5}}
                  onPress={() =>
                    navigation.navigate('EditDetails', {
                      appointmentOpk: props.opk,
                    })
                  }>
                  <TitleText
                    text="Modify"
                    textStyle={{
                      ...styles.textStyle,
                      textAlign: 'center',
                      color: Colors.light.background,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            )}
            {(proposedServiceInfo?.status === 'PROPOSAL' ||
              proposedServiceInfo?.status === 'ACCEPTED') && (
              <TouchableOpacity
                // style={{width: SCREEN_WIDTH / 5}}
                onPress={handleReject}>
                <TitleText
                  text={
                    user?.id === proposedServiceInfo?.userId
                      ? 'Cancel'
                      : 'Decline'
                  }
                  textStyle={{
                    ...styles.textStyle,
                    textAlign: 'center',
                    color: Colors.light.background,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {proposedServiceInfo?.serviceTypeId === 5 &&
          proposedServiceInfo?.providerId === user?.user?.provider?.id &&
          proposedServiceInfo?.status === 'PAID' &&
          appointmentStart === 'STOP' ? (
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'ios') {
                  const callback = (status: AppStateStatus) => {
                    if (status === 'active') {
                      requestPermission(
                        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
                      )
                        .then((result: any) => {
                          if (result !== 'granted') {
                            Alert.alert(
                              'Please enable App Tracking permission in "Settings > Woofmeets" to generate the report.',
                            );
                          } else {
                            navigation.navigate('ReportCardInitial', {
                              screen: 'InboxNavigator',
                              appointmentId: currentDate?.id,
                              reportInfo: currentDate,
                            });
                          }
                        })
                        .catch((error: any) => console.log(error));
                    }
                  };
                  callback(AppState.currentState); // initial call
                  const listener = AppState.addEventListener(
                    'change',
                    callback,
                  );
                  return listener.remove;
                } else {
                  navigation.navigate('ReportCardInitial', {
                    screen: 'InboxNavigator',
                    appointmentId: currentDate?.id,
                    reportInfo: currentDate,
                  });
                }
              }}
              style={[
                styles.detailsButtonStyle,
                {
                  borderColor: colors.borderColor,
                  backgroundColor: Colors.primaryDif,
                },
              ]}>
              <TitleText
                text="Report"
                textStyle={{
                  color: Colors.background,
                  fontWeight: 'bold',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => props.setIsDetailsModal(true)}
              style={[
                styles.detailsButtonStyle,
                {borderColor: colors.borderColor},
              ]}>
              <TitleText text="Details" textStyle={styles.textStyle} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Modals */}
      {proposedServiceInfo?.isRecurring && (
        <RecurringModal
          regenerateModal={regenerateModal}
          setRegenerateModal={setRegenerateModal}
          proposedServiceInfo={proposedServiceInfo}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerInner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMargin: {
    marginLeft: 10,
    width: '84%',
  },
  leftContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: SCREEN_WIDTH <= 380 ? 10 : SCREEN_WIDTH <= 600 ? 15 : 15,
    width: 1,
    backgroundColor: '#FFFFFF',
    // position: 'absolute',
    // left: '49%',
  },
  iconStyle: {paddingRight: 10},
  innerTwo: {
    paddingHorizontal: 5,
    marginTop: SCREEN_WIDTH <= 380 ? 10 : SCREEN_WIDTH <= 600 ? 15 : 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButtonStyle: {
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: SCREEN_WIDTH <= 380 ? 5 : SCREEN_WIDTH <= 600 ? 8 : 8,
    borderRadius: 40,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    // minWidth: '60%',
    width: '72%',
    // maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 40,
  },
  textStyle: {
    fontWeight: '500',
  },
});

export default memo(ActivityHeader);
