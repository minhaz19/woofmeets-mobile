/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getCards} from '../../../store/slices/payment/PaymentCards/getCardsAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import AllCards from '../../../components/ScreenComponent/profile/PaymentMethod/AllCards';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import NoCards from '../../../components/ScreenComponent/profile/PaymentMethod/NoCards';
const endpoint = '/stripe-payment-method/default-card-info';
const PaymentMethods = () => {
  const dispatch = useAppDispatch();
  const {loading, cards} = useAppSelector(state => state.cards);
  const [CardId, setDefaultCard] = useState(null);
  const {loading: dLoading, request} = useApi(methods._get);
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
      {(loading || dLoading) && <AppActivityIndicator visible={true} />}
      {cards ? (
        <>
          <AllCards cards={cards} CardId={CardId} />
        </>
      ) : (
        <NoCards />
      )}
    </>
  );
};

export default PaymentMethods;
