/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getCards} from '../../../store/slices/payment/PaymentCards/getCardsAction';
import AllCards from '../../../components/ScreenComponent/profile/PaymentMethod/AllCards';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import NoCards from '../../../components/ScreenComponent/profile/PaymentMethod/NoCards';
import {getCurrentplan} from '../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';

import {Alert} from 'react-native';
import {confirmPayment} from '@stripe/stripe-react-native';
import {baseUrlV} from '../../../utils/helpers/httpRequest';
import {CancelToken} from 'apisauce';
import LoaderLite from '../../../components/common/Loaders/LoaderLite';
// import {Text} from 'react-native-svg';
// import AnimatedLottieView from 'lottie-react-native';
// import Colors from '../../../constants/Colors';
const endpoint = '/stripe-payment-method/default-card-info';
interface Props {
  navigation: any;
  route: {
    params: {
      sequence: number | null | string;
    };
  };
}
const subscriptionEndpoint = `${baseUrlV}/v1/subscriptions/subscribe?`;
const PaymentMethods = ({route, navigation}: Props) => {
  const [modL, setModL] = useState(false);
  const uuid = Math.random().toString(36).substring(2, 36);
  const dispatch = useAppDispatch();
  const {cards, loading} = useAppSelector(state => state.cards);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [CardId, setDefaultCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const {proposedServiceInfo, billingId} = useAppSelector(
    state => state.proposal,
  );
  const {request, loading: getLoading} = useApi(methods._get);
  const {loading: idemLoading, request: idemRequest} = useApi(
    methods._idempt_post,
  );
  const {sequence} = route.params;
  const handlePayment = async () => {
    // if (sequence === 1) {
    //   navigation.navigate('BasicPayment', {
    //     sequence: sequence,
    //     cardId: selectedCard !== null ? selectedCard : CardId,
    //   });
    // } else
    if (sequence === 'Appointment') {
      setAppointmentLoading(true);
      const cardId = selectedCard !== null ? selectedCard : CardId;
      const result: any = await idemRequest(
        `/appointment/${proposedServiceInfo.appointmentOpk}/billing/${billingId}/pay?cardId=${cardId}`,
        {},
        uuid,
      );

      if (result.ok) {
        if (result.ok && result?.data.data.requiresAction === true) {
          const clientScreet = result.data.data.clientSecret;
          const {paymentIntent, error: dsError}: any = await confirmPayment(
            clientScreet,
          );
          setAppointmentLoading(false);
          paymentIntent?.status === 'Succeeded' &&
            navigation.navigate('AppointmentSuccess');
          dsError !== undefined && Alert.alert(dsError.localizedMessage);
        } else if (result.ok && result?.data.data.requiresAction === false) {
          setAppointmentLoading(false);
          navigation.navigate('AppointmentSuccess');
        }
      } else if (!result.ok && result.status === 400) {
        setAppointmentLoading(false);
        Alert.alert(
          'We are unable to process your payment request right now, Please reload the application and try again ',
        );
      } else if (!result.ok && result.status === 409) {
        setAppointmentLoading(false);
        Alert.alert(result?.data?.message);
      }
      setAppointmentLoading(false);
    } else {
      const source = CancelToken.source();
      const selectCardId = selectedCard !== null ? selectedCard : CardId;
      const result = await idemRequest(
        `${subscriptionEndpoint}priceId=${sequence}&cardId=${selectCardId}`,
        {},
        uuid,
      );

      if (result.ok) {
        if (result.ok && result?.data.data.requiresAction === true) {
          const clientScreet = result.data.data.clientSecret;
          const {paymentIntent, error: dsError}: any = await confirmPayment(
            clientScreet,
          );
          if (paymentIntent?.status === 'Succeeded') {
            await dispatch(getCurrentplan(source));
            navigation.navigate('SubscriptionScreen');
          }
          dsError !== undefined && Alert.alert(dsError.localizedMessage);
        } else if (result.ok && result?.data.data.requiresAction === false) {
          dispatch(getCurrentplan(source));
          navigation.navigate('SubscriptionScreen');
        }
      } else if (!result.ok && result.status === 400) {
        Alert.alert(result.data.message);
        // Alert.alert(
        //   'We are unable to process your payment request right now, Please reload the application and try again ',
        // );
      } else if (!result.ok && result.status === 409) {
        Alert.alert(result?.data?.message);
      }
    }
  };
  const callApi = async (source: any) => {
    const result = await request(
      endpoint,
      {},
      {
        cancelToken: source.token,
      },
    );
    result.ok && setDefaultCard(result.data.data.id);
  };
  useEffect(() => {
    const source = CancelToken.source();
    callApi(source);
    cards === null && dispatch(getCards(source));
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    setModL(loading || getLoading);
  }, [loading, getLoading]);
  return modL ? (
    <LoaderLite />
  ) : cards === undefined || cards === null ? (
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
  );
};

export default PaymentMethods;
