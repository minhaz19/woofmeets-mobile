/* eslint-disable react-hooks/exhaustive-deps */
import {createToken} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../api/methods';
import {getCards} from '../../../store/slices/payment/PaymentCards/getCardsAction';
import {useAppDispatch} from '../../../store/store';
import {useApi} from '../../../utils/helpers/api/useApi';

const customerEndPoint = '/stripe-payment-method/customers';
const endpoint = '/stripe-payment-method/add-card';
export const useCreditDebitCard = (navigation: any) => {
  const [tokenLoading, setTokenLoading] = useState(false);
  const [customerId, setCustomerId] = useState<string | null | undefined>('');
  const {request, loading} = useApi(methods._post);
  const dispatch = useAppDispatch();
  // const {loading: getLoading, request} = useApi(methods._post);
  const {request: getReq} = useApi(methods._get);
  const cd = async () => {
    const response = await getReq(customerEndPoint);
    console.log('res', response);
    response.ok && setCustomerId(response?.data?.data.stripeCustomerId);
  };
  useEffect(() => {
    cd();
  }, []);
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
    console.log('token check', token, cardData);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('errors', error);
    } else if (token) {
      const reqPayload = {
        customerId: customerId,
        countryId: 1,
        token: token.id,
      };
      console.log('card', token);
      const result = await request(endpoint, reqPayload);
      console.log('result', result);
      result.ok && navigation.navigate('PaymentMethod');
      dispatch(getCards());
    }
  };
  return {handleValues, tokenLoading, loading};
};
