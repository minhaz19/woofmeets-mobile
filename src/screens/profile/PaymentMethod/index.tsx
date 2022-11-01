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
const uuid = Math.random().toString(36).substring(2, 36);
const subscriptionEndpoint =
  'https://api-stg.woofmeets.com/v3/subscriptions/subscribe?';
const PaymentMethods = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {cards, loading} = useAppSelector(state => state.cards);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [CardId, setDefaultCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const {request} = useApi(methods._get);
  // const {loading: Hloading, request: postRequest} = useApi(methods._post);
  const {loading: idemLoading, request: idemRequest} = useApi(
    methods._idempt_post,
  );
  const {sequence} = route.params;
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const handlePayment = async () => {
    if (sequence === 1) {
      navigation.navigate('BasicPayment', {
        sequence: sequence,
        cardId: selectedCard !== null ? selectedCard : CardId,
      });
    } else if (sequence === 'Appointment') {
      setAppointmentLoading(true);
      const cardId = selectedCard !== null ? selectedCard : CardId;
      const result: any = await idemRequest(
        `/appointment/${proposedServiceInfo.appointmentOpk}/billing/${proposedServiceInfo.billing[0]?.id}/pay?cardId=${cardId}`,
        {},
        uuid,
      );

      if (result.ok) {
        if (result.ok && result?.data.data.requiresAction === true) {
          try {
            const clientScreet = result.data.data.clientSecret;
            const {paymentIntent, error: dsError}: any = await confirmPayment(
              clientScreet,
            );
            dsError.code === 'Failed' && Alert.alert(dsError.localizedMessage);
            setAppointmentLoading(false);
            paymentIntent?.status === 'Succeeded' &&
              navigation.navigate('AppointmentSuccess');
          } catch (er: any) {
            setAppointmentLoading(false);
            Alert.alert(er.message);
          }
        } else if (result.ok && result?.data.data.requiresAction === false) {
          setAppointmentLoading(false);
          navigation.navigate('AppointmentSuccess');
        }
      } else if (!result.ok && result.status === 400) {
        setAppointmentLoading(false);
        Alert.alert(
          'We are unable to proccess your payment request right now, Please reload the application and try again ',
        );
      } else if (!result.ok && result.status === 409) {
        setAppointmentLoading(false);
        Alert.alert(result?.data?.message);
      }
      setAppointmentLoading(false);
    } else {
      const selectCardId = selectedCard !== null ? selectedCard : CardId;
      const result = await idemRequest(
        `${subscriptionEndpoint}priceId=${sequence}&cardId=${selectCardId}`,
        {},
        uuid,
      );
      console.log('result', result);
      if (result.ok) {
        dispatch(getCurrentplan());
        navigation.navigate('SubscriptionScreen');
      } else {
        Alert.alert(result.data.message);
      }
      // if (result.ok) {
      //   if (result.ok && result?.data.data.requiresAction === true) {
      //     try {
      //       const clientScreet = result.data.data.clientSecret;
      //       const {paymentIntent, error: dsError}: any = await confirmPayment(
      //         clientScreet,
      //       );
      //       console.log('m', paymentIntent, dsError);
      //       if (dsError.code === 'Failed') {
      //         return Alert.alert(dsError.localizedMessage);
      //       }

      //       paymentIntent?.status === 'Succeeded' &&
      //         (dispatch(getCurrentplan()),
      //         navigation.navigate('SubscriptionScreen'));
      //     } catch (er: any) {
      //       Alert.alert(er.message);
      //     }
      //   } else if (result.ok && result?.data.data.requiresAction === false) {
      //     dispatch(getCurrentplan());
      //     navigation.navigate('SubscriptionScreen');
      //   }
      // } else if (!result.ok && result.status === 400) {
      //   Alert.alert(result.data.message);
      //   // Alert.alert(
      //   //   'We are unable to proccess your payment request right now, Please reload the application and try again ',
      //   // );
      // } else if (!result.ok && result.status === 409) {
      //   Alert.alert(result?.data?.message);
      // }
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
            loading={idemLoading || appointmentLoading}
            setSelectedCard={setSelectedCard}
          />
        </>
      )}
    </>
  );
};

export default PaymentMethods;
