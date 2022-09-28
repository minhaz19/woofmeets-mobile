// import {createToken} from '@stripe/stripe-react-native';
import {useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../api/methods';
import {useApi} from '../../../utils/helpers/api/useApi';

const endpoint = '/stripe-payment-method/add-card';
export const useCreditDebitCard = () => {
  const [tokenLoading, setTokenLoading] = useState(false);
  const {request, loading} = useApi(methods._post);
  const handleValues = async (cardData: any) => {
    // : Token.CreateParams
    setTokenLoading(true);
    const tokenPayload: any = {
      type: 'Card',
      address: {
        country: cardData.cardInfo.city,
        city: cardData.city,
        state: cardData.state,
        postalCode: cardData.cardInfo.city,
        line1: cardData.line1,
        line2: cardData.line2,
      },
      currency: 'USD',
      name: cardData.name,
    };
    // const {error, token} = await createToken(tokenPayload);
    // setTokenLoading(false);
    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    // } else if (token) {
    //   Alert.alert(
    //     'Success',
    //     `The token was created successfully! token: ${token.id}`,
    //   );
    // }
    // const reqPayload = {
    //   customerId: 'cus_MW1QbAZnzwBnWu',
    //   countryId: 1,
    //   token: token?.id,
    // };
    // console.log('card', token);
    // const result = await request(endpoint, reqPayload);
    // console.log('result', result);
  };
  return {handleValues, tokenLoading, loading};
};