/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
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
import {formatDate} from '../../common/formatDate';
const acceptEndpoint = '/appointment/accept/proposal/';
const completeEndpoint = '/appointment/complete/';
const rejectEndpoint = '/appointment/proposal/reject/';

const ActivityHeader = (props: {
  setIsDetailsModal: (arg0: boolean) => void;
  setIsThreeDotsModal: (arg0: boolean) => void;
  opk?: any;
}) => {
  let navigation = useNavigation<any>();
  const {colors} = useTheme();
  const {request} = useApi(methods._put);
  const dispatch = useAppDispatch();
  const [regenerateModal, setRegenerateModal] = useState(false);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const user = useAppSelector(state => state.whoAmI);
  const handleAccept = async () => {
    const result = await request(acceptEndpoint + props.opk);
    if (result.ok) {
      dispatch(getProviderProposal(proposedServiceInfo.appointmentOpk));
      dispatch(getAppointmentStatus('PROPOSAL'));
      dispatch(getProviderApnt('PROPOSAL'));
      navigation.navigate('Inbox');
    } else {
      Alert.alert(result?.data?.message);
    }
  };
  const handleRegenerate = async () => {
    setRegenerateModal(true);
  };

  const handleComplete = () => {
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
              navigation.navigate('Inbox');
            } else if (!r.ok) {
              Alert.alert(r.data.message);
            }
          },
        },
      ],
    );
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
              navigation.navigate('Inbox');
            } else if (!r.ok) {
              Alert.alert(r.data.message);
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <View style={[styles.container, {borderColor: colors.borderColor}]}>
        <View style={styles.containerInner}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity
              style={styles.leftContainer}
              onPress={() => {
                navigation.navigate('Inbox');
              }}>
              <Ionicons
                name="ios-chevron-back"
                size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
                style={styles.iconStyle}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
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
                        formatDate(
                          proposedServiceInfo.proposalStartDate,
                          'iii LLL d',
                        )
                      : proposedServiceInfo?.serviceTypeId === 3 ||
                        proposedServiceInfo?.serviceTypeId === 5
                      ? proposedServiceInfo?.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          formatDate(
                            proposedServiceInfo.recurringStartDate,
                            'iii LLL d',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          formatDate(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            'iii LLL d',
                          )
                      : proposedServiceInfo?.serviceTypeId === 4
                      ? proposedServiceInfo.isRecurring
                        ? proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          formatDate(
                            proposedServiceInfo.recurringStartDate,
                            'iii LLL d',
                          )
                        : proposedServiceInfo?.serviceName +
                          ' from:  ' +
                          formatDate(
                            proposedServiceInfo.proposalOtherDate[0].date,
                            'iii LLL d',
                          )
                      : ''
                  }
                />
              </View>
            </View>
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
                  <TouchableOpacity
                    // style={{width: SCREEN_WIDTH / 5}}
                    onPress={() => navigation.navigate('AppointmentSuccess')}>
                    <TitleText
                      text={'Paid Successfully'}
                      textStyle={{
                        ...styles.textStyle,
                        textAlign: 'center',
                        color: Colors.light.background,
                      }}
                    />
                  </TouchableOpacity>
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
                  text="Decline"
                  textStyle={{
                    ...styles.textStyle,
                    textAlign: 'center',
                    color: Colors.light.background,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => props.setIsDetailsModal(true)}
            style={[
              styles.detailsButtonStyle,
              {borderColor: colors.borderColor},
            ]}>
            <TitleText text="Details" textStyle={styles.textStyle} />
          </TouchableOpacity>
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
