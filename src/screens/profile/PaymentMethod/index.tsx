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
const endpoint = '/stripe-payment-method/default-card-info';
interface Props {
  navigation: any;
  route: {
    params: {
      sequence: number | null;
    };
  };
}
const subscriptionEndpoint = '/subscriptions/subscribe/';
const PaymentMethods = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {loading, cards} = useAppSelector(state => state.cards);
  const [CardId, setDefaultCard] = useState(null);
  const {loading: dLoading, request} = useApi(methods._get);
  const {loading: Hloading, request: postRequest} = useApi(methods._post);
  const {sequence} = route.params;

  const handlePayment = async () => {
    const result = await postRequest(
      `${subscriptionEndpoint}?priceId=${sequence}&cardId=${CardId}`,
    );
    result.ok &&
      (await dispatch(getCurrentplan()),
      navigation.navigate('SubscriptionScreen'));
  };
  useEffect(() => {
    const callApi = async () => {
      const result = await request(endpoint);
      result.ok && setDefaultCard(result.data.data.id);
    };
    callApi();
    cards === null && dispatch(getCards());
  }, []);
  return (
    <>
      {/* {(loading || dLoading) && <AppActivityIndicator visible={true} />} */}
      {cards === undefined || cards === null ? (
        <NoCards sequence={sequence} />
      ) : (
        <>
          <AllCards
            cards={cards}
            CardId={CardId}
            sequence={sequence}
            onPress={handlePayment}
            loading={Hloading}
          />
        </>
      )}
    </>
  );
};

export default PaymentMethods;
