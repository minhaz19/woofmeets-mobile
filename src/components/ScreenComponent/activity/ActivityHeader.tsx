/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {getAppointmentStatus} from '../../../store/slices/Appointment/Inbox/User/Proposal/getAppointmentStatus';
import {getProviderApnt} from '../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import {getProviderProposal} from '../../../store/slices/Appointment/Proposal/getProviderProposal';
import RecurringModal from './components/RecurringModal';
import {setBillingId} from '../../../store/slices/Appointment/Proposal/providerProposalSlice';
import changeTextLetter from '../../common/changeTextLetter';
import {convertToLocalTZ, formatDate} from '../../common/formatDate';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import {getProviderProfile} from '../../../store/slices/Provider/ProviderProfile/singlePet/providerProfileAction';
// import {format} from 'date-fns';
// import AppActivityIndicator from '../../common/Loaders/AppActivityIndicator';
const acceptEndpoint = '/appointment/accept/proposal/';
const completeEndpoint = '/appointment/complete/';
const rejectEndpoint = '/appointment/proposal/reject/';
const cardEndpoint = '/appointment/card/all-dates/';
const startEndpoint = '/appointment/card/start-appointment/';
const stopEndpoint = '/appointment/card/stop-appointment/';
const ActivityHeader = (props: {
  setIsDetailsModal: (arg0: boolean) => void;
  setIsThreeDotsModal: (arg0: boolean) => void;
  setVisitId: any;
  opk?: any;
  proposedServiceInfo?: any;
}) => {
  let navigation = useNavigation<any>();
  const {colors} = useTheme();
  const {request: getRequest} = useApi(methods._get);
  const {request} = useApi(methods._put);
  const {request: ssReqest, loading} = useApi(methods._put);
  const dispatch = useAppDispatch();
  const [regenerateModal, setRegenerateModal] = useState(false);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const [currentDate, setCurrentDate] = useState<any>({});
  const [appointmentStart, setAppointmentStart] = useState('START');
  const [allDates, setAllDates] = useState<any>([]);
  const user = useAppSelector(state => state.whoAmI);
  const timezone = proposedServiceInfo?.providerTimeZone;
  const datePassed = (date: any) => {
    return new Date(date) < today;
  };
  const isComming = (date: any) => {
    return new Date(date) > today;
  };
  const isDateNotFound = () => {
    return allDates?.findIndex((f: any) => new Date(f.date) === today) === -1;
  };
  const handleAccept = async () => {
    const result = await request(acceptEndpoint + props.opk);
    if (result.ok) {
      dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      dispatch(getAppointmentStatus('PROPOSAL'));
      dispatch(getProviderApnt('PROPOSAL'));
      navigation.navigate('InboxNavigator');
    } else {
      Alert.alert(result?.data?.message);
    }
  };
  const handleRegenerate = async () => {
    setRegenerateModal(true);
  };

  const handleComplete = () => {
    if (
      (proposedServiceInfo.serviceTypeId === 1 ||
        proposedServiceInfo.serviceTypeId === 2) &&
      (!datePassed(allDates[allDates?.length - 1]?.date) ||
        !isSameDate(allDates[allDates?.length - 1]?.date))
    ) {
      Alert.alert(
        `You can not complete appointment before ${formatDate(
          allDates[allDates?.length - 1]?.date,
          'iii LLL d yyyy',
        )}`,
      );
    } else if (
      (proposedServiceInfo.serviceTypeId !== 1 ||
        proposedServiceInfo.serviceTypeId !== 2) &&
      (!datePassed(allDates[allDates?.length - 1]?.date) ||
        !isSameDate(allDates[allDates?.length - 1]?.date))
    ) {
      Alert.alert(
        `You can not complete appointment before ${formatDate(
          allDates[allDates?.length - 1]?.date,
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
                dispatch(getAppointmentStatus('PAID'));
                dispatch(getProviderApnt('PAID'));
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
  };

  const handleProfile = async () => {
    if (user?.userId === proposedServiceInfo.userId) {
      await dispatch(getProviderProfile(proposedServiceInfo?.providerOpk));
      navigation.navigate('ProviderProfile', {
        providerOpk: proposedServiceInfo?.providerOpk,
      });
    }
  };
  // const callApi = async () => {
  //   return await getRequest(cardEndpoint + props.opk);
  // };
  const today = new Date();
  const isSameDate = (date: string) => {
    const splitDate = date?.split('T')?.[0];
    const formattedToday = formatDate(today, 'yyyy-MM-dd');
    if (formattedToday === splitDate) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const callApi = async () => {
      const data = await getRequest(cardEndpoint + props.opk);
      const arr = data?.data?.data?.sort(function (x: any, y: any) {
        return new Date(x.date).getTime() - new Date(y.date).getTime();
      });
      if (arr?.length > 0) {
        setAllDates(arr);
        const findData = arr?.find(
          (d: any) =>
            (isSameDate(d?.date) === true &&
              (d?.startTime === null || d?.stopTime === null)) ||
            (!isSameDate(d?.date) && d?.startTime === null),
        );
        // ,
        if (findData && findData !== undefined) {
          setCurrentDate(findData);
          props.setVisitId(findData.id);
        } else {
        }
      }
    };
    callApi();
  }, [appointmentStart, props.opk]);

  useEffect(() => {
    if (
      proposedServiceInfo?.serviceTypeId === 1 ||
      proposedServiceInfo?.serviceTypeId === 2
    ) {
      if (
        allDates?.[0]?.startTime === null &&
        isSameDate(allDates?.[0]?.date)
      ) {
        setAppointmentStart('START');
        setCurrentDate(allDates?.[0]?.date);
      } else if (
        allDates?.[0]?.startTime !== null &&
        isSameDate(allDates[allDates?.length - 1]?.date)
      ) {
        setAppointmentStart('STOP');
      } else if (
        allDates?.[0]?.startTime !== null &&
        datePassed(allDates[allDates?.length - 1]?.date)
      ) {
        setAppointmentStart('ENDED');
      } else if (
        allDates?.[0]?.startTime === null &&
        allDates?.[0]?.stopTime === null &&
        isComming(allDates?.[0]?.date)
      ) {
        setAppointmentStart('UPCOMING');
      } else if (allDates?.[0]?.startTime !== null) {
        setAppointmentStart('INPROGRESS');
      } else if (isDateNotFound()) {
        setAppointmentStart('NOAPPOINTMENT');
      } else {
        setAppointmentStart('PAST');
      }
    } else {
      if (currentDate.startTime === null && isSameDate(currentDate?.date)) {
        setAppointmentStart('START');
      } else if (
        currentDate.startTime !== null &&
        currentDate.stopTime === null &&
        isSameDate(currentDate?.date)
      ) {
        setAppointmentStart('STOP');
      } else if (
        currentDate.startTime === null &&
        isComming(currentDate?.date)
      ) {
        setAppointmentStart('UPCOMING');
      } else if (
        (currentDate?.startTime !== null && datePassed(currentDate?.date)) ||
        (currentDate?.startTime === null && datePassed(currentDate?.date))
      ) {
        setAppointmentStart('PAST');
      } else if (isDateNotFound()) {
        setAppointmentStart('NOAPPOINTMENT');
      } else {
        // setAppointmentStart('NOAPPOINTMENT');
      }
    }
  }, [
    allDates,
    appointmentStart,
    today,
    currentDate,
    proposedServiceInfo?.serviceTypeId,
  ]);

  const handleStart = async () => {
    if (!isSameDate(currentDate.date)) {
      // currentDate?.date &&
      Alert.alert(
        `You can not start appointment before or after ${formatDate(
          new Date(currentDate?.date),
          'iii LLL d yyyy',
        )}`,
      );
    } else {
      const startRes = await ssReqest(startEndpoint + currentDate?.id, {
        startTime: new Date().toISOString(),
      });
      if (startRes.ok) {
        if (proposedServiceInfo.serviceTypeId === 5) {
          navigation.navigate('ReportCardInitial', {
            screen: 'InboxNavigator',
            appointmentId: currentDate?.id,
          });
        }
        setCurrentDate(startRes?.data?.data);
        setAppointmentStart('STOP');
      }
    }
  };
  const handleStop = async () => {
    if (false) {
    } else {
      const stopRes = await ssReqest(stopEndpoint + currentDate?.id, {
        stopTime: new Date().toISOString(),
      });
      if (stopRes) {
        setAppointmentStart('START');
        navigation.navigate('GenerateReport', {
          screen: 'InboxNavigator',
          reportInfo: stopRes.data.data,
        });
        setCurrentDate(stopRes?.data?.data);
      }
    }
  };
  const handleStatus = () => {
    if (appointmentStart === 'UPCOMING') {
      Alert.alert('You appointment is comming soon');
    } else if (appointmentStart === 'NOAPPOINTMENT') {
      Alert.alert('You have no appointment on this particular day');
    } else if (appointmentStart === 'INPROGRESS') {
      Alert.alert('Your appointment is in progress');
    } else if (appointmentStart === 'ENDED') {
      Alert.alert('Your appointment date has already been passed.');
    } else if (appointmentStart === 'PAST') {
      Alert.alert('Your appointment has been passed.');
    } else {
      Alert.alert('No sure about the status');
    }
  };
  return (
    <>
      {/* {loading && <AppActivityIndicator visible={true} />} */}
      <View style={[styles.container, {borderColor: colors.borderColor}]}>
        <View style={styles.containerInner}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity
              style={styles.leftContainer}
              onPress={() => {
                navigation.navigate('InboxNavigator');
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
                          'MMM ddd D',
                        )
                      : proposedServiceInfo?.serviceTypeId === 3 ||
                        proposedServiceInfo?.serviceTypeId === 5
                      ? proposedServiceInfo?.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.recurringStartDate,
                            timezone,
                            'MMM ddd D',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            timezone,
                            'MMM ddd D',
                          )
                      : proposedServiceInfo?.serviceTypeId === 4
                      ? proposedServiceInfo.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.recurringStartDate,
                            timezone,
                            'MMM ddd D',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          convertToLocalTZ(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            timezone,
                            'MMM ddd D',
                          )
                      : ''
                  }
                />
              </View>
            </AppTouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={() => props.setIsThreeDotsModal(true)}>
            <Entypo
              name="dots-three-vertical"
              size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
              color={Colors.primary}
            />
          </TouchableOpacity>
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
                      dispatch(setBillingId(proposedServiceInfo.billing[0].id));
                      navigation.navigate('Checkout');
                    }
                  }}>
                  <TitleText
                    text={
                      proposedServiceInfo?.proposedBy === 'PROVIDER' &&
                      proposedServiceInfo?.status !== 'ACCEPTED'
                        ? 'Accept'
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
                    text="Accept"
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
                          loading
                            ? 'loading...'
                            : appointmentStart === 'START'
                            ? 'Start Appointment'
                            : appointmentStart === 'STOP'
                            ? 'Complete Appointment'
                            : appointmentStart === 'ENDED'
                            ? 'Appointment Ended'
                            : appointmentStart === 'UPCOMING'
                            ? 'Comming Soon'
                            : appointmentStart === 'NOAPPOINTMENT'
                            ? 'No Appointment'
                            : appointmentStart === 'INPROGRESS'
                            ? 'In Progress'
                            : appointmentStart === 'PAST'
                            ? 'Past Appointment'
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
                        onPress={handleComplete}>
                        <TitleText
                          text="Complete"
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
                        onPress={handleComplete}>
                        <TitleText
                          text="Complete"
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
                // if (appointmentStart === 'START') {
                //   ('You have to start the appointment to generate report');
                // } else if (appointmentStart === 'STOP') {
                //   navigation.navigate('ReportCardInitial', {
                //     screen: 'InboxNavigator',
                //     appointmentId: currentDate?.id,
                //   });
                // }
                navigation.navigate('ReportCardInitial', {
                  screen: 'InboxNavigator',
                  appointmentId: currentDate?.id,
                });
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

export default ActivityHeader;
