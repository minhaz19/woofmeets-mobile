/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import BottomHalfModal from '../../../UI/modal/BottomHalfModal';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import format from 'date-fns/format';
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
interface Props {
  regenerateModal: any;
  setRegenerateModal: any;
  proposedServiceInfo: any;
}
const regenerateEndpoint = '/appointment/recurring-billing/';
const RecurringModal = ({regenerateModal, setRegenerateModal}: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {request, loading} = useApi(methods._put);
  const handleCancel = () => {
    setRegenerateModal(false);
  };
  const handleGenerate = async () => {
    const result = await request(
      regenerateEndpoint + proposedServiceInfo?.appointmentOpk,
    );
    console.log('result generate', result);
    if (result.ok) {
      dispatch(setBillingId(result.data.data.billing.id));
      dispatch(getProviderProposal(proposedServiceInfo?.appointmentOpk));
      setRegenerateModal(false);
      navigation.navigate('Checkout');
    }
  };
  console.log('proposedServiceInfo', proposedServiceInfo);
  return (
    <View>
      <BottomHalfModal
        isModalVisible={regenerateModal}
        setIsModalVisible={setRegenerateModal}
        height={'60%'}
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
                    text={`${format(
                      new Date(proposedServiceInfo?.recurringStartDate),
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  marginTop: 4,
                }}>
                <TitleText
                  textStyle={{
                    fontSize: Text_Size.Text_1,
                    marginVertical: 5,
                    textAlign: 'justify',
                  }}
                  text={proposedServiceInfo?.formattedMessage}
                />
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
                style={{
                  flex: 1,
                  marginleft: 10,
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 5,
                }}>
                <TitleText
                  text={'Proceed'}
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

const styles = StyleSheet.create({});
