/* eslint-disable react-hooks/exhaustive-deps */
import {confirmPayment, createToken} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../../api/methods';
import {getCards} from '../../../../../store/slices/payment/PaymentCards/getCardsAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const customerEndPoint = '/stripe-payment-method/customers';
const endpoint = '/stripe-payment-method/add-card';
const subscriptionEndpoint = '/subscriptions/subscribe';
import {v4 as uuidv4} from 'uuid';
import apiClient from '../../../../../api/client';
const uuid = uuidv4();
export const useAddCardForm = (
  navigation: any,
  sequence: number | null | string,
) => {
  const [tokenLoading, setTokenLoading] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null | undefined>('');
  const {request, loading} = useApi(methods._post);
  const dispatch = useAppDispatch();
  const {request: getReq} = useApi(methods._get);
  const cd = async () => {
    const response = await getReq(customerEndPoint);
    response.ok && setCustomerId(response?.data?.data.stripeCustomerId);
  };
  useEffect(() => {
    cd();
  }, []);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const handleValues = async (cardData: any) => {
    setTokenLoading(true);
    const tokenPayload: any = {
      type: 'Card',
      address: {
        country: null,
        city: cardData.city,
        state: cardData.state,
        postalCode: cardData.postalCode,
        line1: cardData.line1,
        line2: null,
      },
      currency: 'USD',
      name: cardData.name,
    };
    const {error, token} = await createToken(tokenPayload);
    setTokenLoading(false);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (token) {
      const reqPayload = {
        customerId: customerId,
        countryId: 1,
        token: token.id,
      };
      const result = await request(endpoint, reqPayload);
      if (result.ok && (sequence !== null || sequence !== undefined)) {
        const cardId = result.data.data.id;
        if (sequence === 1) {
          navigation.navigate('BasicPayment', {
            sequence: sequence,
            cardId: cardId,
          });
        } else if (sequence === 2 || sequence === 3) {
          const res = await request(
            `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardId}`,
          );
          res.ok && navigation.navigate('SubscriptionScreen');
        } else if (sequence === 'Appointment') {
          setAppointmentLoading(true);

          const appointmentResult: any = await apiClient.post(
            `/appointment/${proposedServiceInfo.appointmentOpk}/billing/${proposedServiceInfo.billing[0]?.id}/pay?cardId=${cardId}`,
            {},
            {
              headers: {
                'Idempontency-Key': uuid,
              },
            },
          );
          console.log('appointment respnse', uuid, appointmentResult, cardId);

          if (appointmentResult.ok) {
            if (
              appointmentResult.ok &&
              appointmentResult.status === 201 &&
              appointmentResult?.data.data.requiresAction === true
            ) {
              try {
                const clientScreet = appointmentResult.data.data.clientSecret;
                const r: any = await confirmPayment(clientScreet);
                r?.error?.code === 'Failed' &&
                  Alert.alert(r?.error?.localizedMessage);
                setAppointmentLoading(false);
                r.paymentIntent?.status === 'Succeeded' &&
                  navigation.navigate('AppointmentSuccess');
                console.log('r tyr', r);
              } catch (er) {
                setAppointmentLoading(false);
                console.log('error', er);
              }
            } else if (
              appointmentResult.ok &&
              appointmentResult.status === 201 &&
              appointmentResult?.data.data.requiresAction === false
            ) {
              setAppointmentLoading(false);
              navigation.navigate('AppointmentSuccess');
            }
            setAppointmentLoading(false);
          } else if (
            !appointmentResult.ok &&
            appointmentResult.status === 400
          ) {
            setAppointmentLoading(false);
            Alert.alert(appointmentResult?.data?.message);
          } else if (
            !appointmentResult.ok &&
            appointmentResult.status === 409
          ) {
            setAppointmentLoading(false);
            Alert.alert(appointmentResult?.data?.message);
          }
        } else {
          navigation.navigate('PaymentMethod', {sequence: null});
        }
      }
      dispatch(getCards());
    }
  };
  return {handleValues, tokenLoading, loading, appointmentLoading};
};
