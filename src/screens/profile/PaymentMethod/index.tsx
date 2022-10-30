/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getCards} from '../../../store/slices/payment/PaymentCards/getCardsAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import AllCards from '../../../components/ScreenComponent/profile/PaymentMethod/AllCards';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import NoCards from '../../../components/ScreenComponent/profile/PaymentMethod/NoCards';
import {getCurrentplan} from '../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {v4 as uuidv4} from 'uuid';
import apiClient from '../../../api/client';
import {Alert} from 'react-native';
import {confirmPayment} from '@stripe/stripe-react-native';
const endpoint = '/stripe-payment-method/default-card-info';
interface Props {
  navigation: any;
  route: {
    params: {
      sequence: number | null | string;
    };
  };
}
const uuid = uuidv4();
const subscriptionEndpoint = '/subscriptions/subscribe/';
const PaymentMethods = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {cards, loading} = useAppSelector(state => state.cards);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [CardId, setDefaultCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const {request} = useApi(methods._get);
  const {loading: Hloading, request: postRequest} = useApi(methods._post);
  const {sequence} = route.params;
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  console.log('payment methods', proposedServiceInfo);
  const handlePayment = async () => {
    if (sequence === 1) {
      navigation.navigate('BasicPayment', {
        sequence: sequence,
        cardId: selectedCard !== null ? selectedCard : CardId,
      });
    } else if (sequence === 'Appointment') {
      if (proposedServiceInfo.billing.length === 0) {
        Alert.alert('No Billing id found');
      } else {
        setAppointmentLoading(true);
        const cardId = selectedCard !== null ? selectedCard : CardId;
        const result: any = await apiClient.post(
          `/appointment/${proposedServiceInfo.appointmentOpk}/billing/${proposedServiceInfo.billing[0]?.id}/pay?cardId=${cardId}`,
          {},
          {
            headers: {
              'Idempontency-Key': uuid,
            },
          },
        );
        console.log('r', result);

        if (result.ok) {
          if (
            result.ok &&
            result.status === 201 &&
            result?.data.data.requiresAction === true
          ) {
            try {
              const clientScreet = result.data.data.clientSecret;
              const r: any = await confirmPayment(clientScreet);
              r?.error?.code === 'Failed' &&
                Alert.alert(r?.error?.localizedMessage);
              console.log('inside', r);
              setAppointmentLoading(false);
              r.paymentIntent?.status === 'Succeeded' &&
                navigation.navigate('AppointmentSuccess');
            } catch (er: any) {
              setAppointmentLoading(false);
              Alert.alert(er.message);
              console.log('err', er);
            }
          } else if (
            result.ok &&
            result.status === 201 &&
            result?.data.data.requiresAction === false
          ) {
            setAppointmentLoading(false);
            navigation.navigate('AppointmentSuccess');
          }
        } else if (!result.ok && result.status === 400) {
          setAppointmentLoading(false);
          Alert.alert(result?.data?.message);
        } else if (!result.ok && result.status === 409) {
          setAppointmentLoading(false);
          Alert.alert(result?.data?.message);
        }
        setAppointmentLoading(false);
      }
    } else {
      const selectCardId = selectedCard !== null ? selectedCard : CardId;
      const result = await postRequest(
        `${subscriptionEndpoint}?priceId=${sequence}&cardId=${selectCardId}`,
      );
      result.ok &&
        (await dispatch(getCurrentplan()),
        navigation.navigate('SubscriptionScreen'));
    }
  };
  const callApi = async () => {
    const result = await request(endpoint);
    result.ok && setDefaultCard(result.data.data.id);
  };
  useEffect(() => {
    callApi();
    cards === null && dispatch(getCards());
  }, []);
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      {cards === undefined || cards === null ? (
        <NoCards sequence={sequence} />
      ) : (
        <>
          <AllCards
            cards={cards}
            CardId={CardId}
            sequence={sequence}
            onPress={handlePayment}
            loading={Hloading || appointmentLoading}
            setSelectedCard={setSelectedCard}
          />
        </>
      )}
    </>
  );
};

export default PaymentMethods;
