/* eslint-disable react-native/no-inline-styles */
import {Alert, View} from 'react-native';
import React from 'react';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import Colors from '../../../../constants/Colors';
import methods from '../../../../api/methods';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getProviderProposal} from '../../../../store/slices/Appointment/Proposal/getProviderProposal';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import changeTextLetter from '../../../common/changeTextLetter';
import {setBillingId} from '../../../../store/slices/Appointment/Proposal/providerProposalSlice';
import {formatDate} from '../../../common/formatDate';
interface Props {
  regenerateModal: any;
  setRegenerateModal: any;
  proposedServiceInfo: any;
}
const regenerateEndpoint = '/appointment/recurring-billing/';
const RecurringModal = ({regenerateModal, setRegenerateModal}: Props) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {colors, isDarkMode} = useTheme();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {request, loading} = useApi(methods._put);
  const handleCancel = () => {
    setRegenerateModal(false);
  };
  const handleGenerate = async () => {
    const result = await request(
      regenerateEndpoint + proposedServiceInfo?.appointmentOpk,
      {},
    );
    if (result.ok) {
      dispatch(setBillingId(result.data.data.billing.id));
      dispatch(getProviderProposal(proposedServiceInfo?.appointmentOpk));
      setRegenerateModal(false);
      navigation.navigate('Checkout');
    } else {
      Alert.alert(result.data.message);
    }
  };
  return (
    <View>
      <BottomHalfModal
        isModalVisible={regenerateModal}
        setIsModalVisible={setRegenerateModal}
        height={
          proposedServiceInfo?.serviceTypeId === 5 ||
          proposedServiceInfo?.serviceTypeId === 3
            ? '60%'
            : '45%'
        }
        children={
          <View>
            <TitleText
              text={'Are you sure you want to generate next week appoinment?'}
              textStyle={{fontWeight: 'bold', fontSize: Text_Size.Text_2}}
            />
            <View style={{marginVertical: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  textStyle={{
                    fontSize: Text_Size.Text_1,
                    marginVertical: 5,
                    textAlign: 'left',
                  }}
                  text={'Starts From :'}
                />
                {proposedServiceInfo?.recurringStartDate && (
                  <TitleText
                    textStyle={{fontSize: Text_Size.Text_1, marginVertical: 5}}
                    text={`${formatDate(
                      proposedServiceInfo?.recurringStartDate,
                      'iii LLL d',
                    )}`}
                  />
                )}
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  textStyle={{
                    fontSize: Text_Size.Text_1,
                    marginVertical: 5,
                    textAlign: 'left',
                  }}
                  text={'Visits :'}
                />
                <TitleText
                  textStyle={{fontSize: Text_Size.Text_1, marginVertical: 5}}
                  text={`${proposedServiceInfo?.billing?.[0]?.totalDayCount} Visits per week`}
                />
              </View>
              {proposedServiceInfo?.length && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TitleText
                    textStyle={{
                      fontSize: Text_Size.Text_1,
                      marginVertical: 5,
                      textAlign: 'left',
                    }}
                    text={'Visit Length :'}
                  />
                  <TitleText
                    textStyle={{fontSize: Text_Size.Text_1, marginVertical: 5}}
                    text={`${proposedServiceInfo?.length} min each`}
                  />
                </View>
              )}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  textStyle={{
                    fontSize: Text_Size.Text_1,
                    marginVertical: 5,
                    textAlign: 'left',
                  }}
                  text={'Pets Name :'}
                />
                <TitleText
                  textStyle={{fontSize: Text_Size.Text_1, marginVertical: 5}}
                  text={`${changeTextLetter(
                    proposedServiceInfo?.petsInfo
                      ?.map((it: any) => it.pet.name)
                      .join(', '),
                  )}`}
                />
              </View>
              <View
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: colors.borderColor,
                  backgroundColor: colors.borderColor,
                  // backgroundColor: colors.borderColor,
                  marginTop: 8,
                }}>
                {proposedServiceInfo?.serviceTypeId === 3 ||
                proposedServiceInfo?.serviceTypeId === 5 ? (
                  <TitleText
                    textStyle={{
                      fontSize: Text_Size.Text_1,
                      marginVertical: 5,
                      textAlign: 'justify',
                    }}
                    text={`Drop In Visit Proposal:\nRepeat service starting from: ${formatDate(
                      proposedServiceInfo?.recurringStartDate,
                      'iii LLL d',
                    )}\n${proposedServiceInfo?.recurringSelectedDay.map(
                      (item: any) =>
                        `${item.visits.length} Visits on: ${
                          item.date
                        } at ${item.visits
                          .map((ti: any) => ti.time)
                          .join(', ')}`,
                    )}  `}
                  />
                ) : proposedServiceInfo?.serviceTypeId === 4 ? (
                  <TitleText
                    textStyle={{
                      fontSize: Text_Size.Text_1,
                      marginVertical: 5,
                      textAlign: 'justify',
                    }}
                    text={`Doggy Day Care Proposal:\nRepeat service starting from:  ${formatDate(
                      proposedServiceInfo?.recurringStartDate,
                      'iii LLL d',
                    )}\nDrop-off: ${proposedServiceInfo?.dropOffStartTime} - ${
                      proposedServiceInfo?.dropOffEndTime
                    }\nPick-Up: ${proposedServiceInfo?.pickUpStartTime} - ${
                      proposedServiceInfo?.pickUpEndTime
                    }`}
                  />
                ) : null}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AppTouchableOpacity
                style={{
                  flex: 1,
                  marginRight: 10,
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={handleCancel}>
                <TitleText
                  text={'Cancel'}
                  textStyle={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: Colors.background,
                  }}
                />
              </AppTouchableOpacity>
              <AppTouchableOpacity
                onPress={handleGenerate}
                disabled={loading}
                style={{
                  flex: 1,
                  marginleft: 10,
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 5,
                }}>
                <TitleText
                  text={loading ? 'loading...' : 'Proceed'}
                  textStyle={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: Colors.background,
                  }}
                />
              </AppTouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default RecurringModal;
