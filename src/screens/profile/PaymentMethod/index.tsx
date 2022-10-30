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
const endpoint = '/stripe-payment-method/default-card-info';
interface Props {
  navigation: any;
  route: {
    params: {
      sequence: number | null | string;
    };
  };
}
const subscriptionEndpoint = '/subscriptions/subscribe/';
const PaymentMethods = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {cards, loading} = useAppSelector(state => state.cards);
  const [CardId, setDefaultCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const {request} = useApi(methods._get);
  const {loading: Hloading, request: postRequest} = useApi(methods._post);
  const {sequence} = route.params;

  const handlePayment = async () => {
    if (sequence === 1) {
      navigation.navigate('BasicPayment', {
        sequence: sequence,
        cardId: selectedCard !== null ? selectedCard : CardId,
      });
    } else if (sequence === 'Appointment') {
      Alert.alert('Add Api and navigate screen');
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
            loading={Hloading}
            setSelectedCard={setSelectedCard}
          />
        </>
      )}
    </>
  );
};

export default PaymentMethods;
