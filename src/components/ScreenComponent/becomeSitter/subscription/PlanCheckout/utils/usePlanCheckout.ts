// import {confirmPayment} from '@stripe/stripe-react-native';
import {useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../../../api/methods';
import {useApi} from '../../../../../../utils/helpers/api/useApi';

const endpoint = '/subscriptions/subscribe/';
export const usePlanCheckout = (route: any) => {
  const [saveCard, setSaveCard] = useState(false);
  const {loading, request} = useApi(methods._post);
  const {sequence} = route.params;
  const handleSubmit = async (data: any) => {
    const planPayload = {
      packageType: 'MONTHLY',
    };
    const result = await request(`${endpoint + sequence}`, planPayload);

    if (result.ok) {
      const clientSecreet = result?.data.data.clientSecret;
      const billingDetails = {
        email: data.email,
        phone: data.phone,
        address: {
          city: '',
          country: data?.cardInfo?.country,
          line1: '',
          line2: '',
          postalCode: data?.cardInfo.postalCode,
        },
      }; // mocked data for tests
      // const {error, paymentIntent} = await confirmPayment(
      //   clientSecreet,
      //   {
      //     paymentMethodType: 'Card',
      //     paymentMethodData: {
      //       billingDetails,
      //     },
      //   },
      //   {
      //     setupFutureUsage: saveCard ? 'OffSession' : undefined,
      //   },
      // );

      // if (error) {
      //   Alert.alert(`Error code: ${error.code}`, error.message);
      // } else if (paymentIntent) {
      //   Alert.alert(
      //     'Success',
      //     `The payment was confirmed successfully! currency: ${paymentIntent.currency}`,
      //   );
      // }
    }
  };
  return {loading, handleSubmit, saveCard, setSaveCard};
};
