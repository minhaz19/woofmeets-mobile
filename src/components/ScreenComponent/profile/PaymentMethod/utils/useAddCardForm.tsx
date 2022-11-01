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
const subscriptionEndpoint =
  'https://api-stg.woofmeets.com/v3/subscriptions/subscribe?';
import apiClient from '../../../../../api/client';
import {getCurrentplan} from '../../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
const uuid = Math.random().toString(36).substring(2, 36);
export const useAddCardForm = (
  navigation: any,
  sequence: number | null | string,
) => {
  const [tokenLoading, setTokenLoading] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null | undefined>('');
  const {request, loading} = useApi(methods._post);
  const {request: idemRequest, loading: idemLoading} = useApi(
    methods._idempt_post,
  );
  const dispatch = useAppDispatch();
  const {request: getReq} = useApi(methods._get);
  const cd = async () => {
    const response = await getReq(customerEndPoint);
    response.ok && setCustomerId(response?.data?.data.stripeCustomerId);
  };
  useEffect(() => {
    cd();
  }, []);
  console.log('sce', sequence);
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
      console.log('res', result);
      if (result.ok && sequence !== null && sequence !== undefined) {
        const cardId = result.data.data.id;
        if (sequence === 1) {
          navigation.navigate('BasicPayment', {
            sequence: sequence,
            cardId: cardId,
          });
        } else if (sequence === 2 || sequence === 3) {
          const subsRes = await idemRequest(
            `${subscriptionEndpoint}priceId=${sequence}&cardId=${cardId}`,
            {},
            uuid,
          );
          subsRes.ok &&
            (dispatch(getCurrentplan()),
            navigation.navigate('SubscriptionScreen'));
          // if (subsRes.ok) {
          //   if (subsRes.ok && subsRes?.data.data.requiresAction === true) {
          //     try {
          //       const clientScreet = subsRes.data.data.clientSecret;
          //       const {paymentIntent, error: dsError}: any =
          //         await confirmPayment(clientScreet);
          //       console.log('paymentIntent res', paymentIntent, dsError);
          //       if (dsError.code === 'Failed') {
          //         return Alert.alert(dsError.localizedMessage);
          //       }

          //       paymentIntent?.status === 'Succeeded' &&
          //         (dispatch(getCurrentplan()),
          //         navigation.navigate('SubscriptionScreen'));
          //     } catch (er: any) {
          //       Alert.alert(er.message);
          //     }
          //   } else if (
          //     subsRes.ok &&
          //     subsRes?.data.data.requiresAction === false
          //   ) {
          //     dispatch(getCurrentplan());
          //     navigation.navigate('SubscriptionScreen');
          //   }
          // } else if (!subsRes.ok && subsRes.status === 400) {
          //   Alert.alert(
          //     'We are unable to proccess your payment request right now, Please reload the application and try again ',
          //   );
          // } else if (!subsRes.ok && subsRes.status === 409) {
          //   Alert.alert(subsRes?.data?.message);
          // }
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

          if (appointmentResult.ok) {
            if (
              appointmentResult.ok &&
              appointmentResult.status === 201 &&
              appointmentResult?.data.data.requiresAction === true
            ) {
              try {
                const clientScreet = appointmentResult.data.data.clientSecret;
                const {paymentIntent, error: dsError}: any =
                  await confirmPayment(clientScreet);
                dsError?.code === 'Failed' &&
                  Alert.alert(dsError?.localizedMessage);
                setAppointmentLoading(false);
                paymentIntent?.status === 'Succeeded' &&
                  navigation.navigate('AppointmentSuccess');
              } catch (er) {
                setAppointmentLoading(false);
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
            Alert.alert(
              'We are unable to proccess your payment request right now, Please reload the application and try again ',
            );
          } else if (
            !appointmentResult.ok &&
            appointmentResult.status === 409
          ) {
            setAppointmentLoading(false);
            Alert.alert(appointmentResult?.data?.message);
          }
        } else if (sequence === null) {
          console.log('in here');
          navigation.navigate('PaymentMethod', {sequence: null});
        }
      }
      dispatch(getCards());
    }
  };
  return {handleValues, tokenLoading, loading, idemLoading, appointmentLoading};
};
