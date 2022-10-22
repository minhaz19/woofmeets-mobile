/* eslint-disable react-hooks/exhaustive-deps */

import {useNavigation} from '@react-navigation/native';
import {ApiResponse} from 'apisauce';
import {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import methods from '../../../../api/methods';
import {getCurrentplan} from '../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {getSubscription} from '../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';

const endpoint = '/subscriptions/check-basic-verification-payment';
const subscriptionEndpoint = '/subscriptions/subscribe/';
const defaultCardEndpoint = '/stripe-payment-method/default-card-info';
export const useSubscription = () => {
  const [sequence, setSequence] = useState<number>(0);
  const [ssLoading, setSSloading] = useState(false);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const {sitterData} = useAppSelector(state => state.initial);

  const {loading: planLoading, currentPlan} = useAppSelector(
    state => state.currentPlan,
  );
  const {loading: pLoading, request} = useApi(methods._post);
  const {loading: cardLoading, request: cardRequest} = useApi(methods._get);
  const navigation = useNavigation<any>();
  const formattedPackageRate = plans?.map((item: any) => ({
    id: item.id,
    sequence: item.id,
    title: item.name[0].toUpperCase() + item.name.slice(1),
    description: 'Only 5% Service Fee For All Unlimited Appointments',
    price: item.MembershipPlanPrices[0].rate,
    annualRate: item.annualRate,
    details: item.features?.map((des: any, i: number) => ({
      id: i + 1,
      description: des,
    })),
  }));
  const onPressEvent = (id: number) => {
    setSequence(id);
  };
  const handleSubmit = async () => {
    if (sitterData[1].isCompleted && sitterData[2].isCompleted && sitterData[3].isCompleted) {
      if (sequence === 1) {
        setSSloading(true);
        const result: ApiResponse<any> = await methods._get(endpoint);
  
        const cardResponse = await cardRequest(defaultCardEndpoint);
        if (result.ok && cardResponse.ok) {
          if (
            result.data.data.needPayment === true &&
            cardResponse.status === 200
          ) {
            navigation.navigate('PaymentMethod', {
              sequence: sequence,
            });
            setSSloading(false);
          } else if (result.data.data.needPayment === false) {
            const cardId = cardResponse?.data?.data.id;
            const subscriptionResult = await request(
              `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardId}`,
            );
            subscriptionResult.ok &&
              (await dispatch(getCurrentplan()),
              // @ts-ignore
              navigation.navigate('SubscriptionScreen'));
            setSSloading(false);
          }
        } else {
          // @ts-ignore
          navigation.navigate('PaymentMethod', {sequence: sequence});
          setSSloading(false);
        }
      } else {
        // @ts-ignore
        navigation.navigate('PaymentMethod', {sequence: sequence});
        setSSloading(false);
      }
    } else {
      Alert.alert('Please complete all the steps first');
    }
    
  };
  useEffect(() => {
    (currentPlan === null || currentPlan === undefined) &&
      dispatch(getCurrentplan());
    (currentPlan === null || plans === null) && dispatch(getSubscription());
  }, []);
  return {
    onPressEvent,
    sequence,
    loading,
    formattedPackageRate,
    pLoading,
    handleSubmit,
    planLoading,
    currentPlan,
    ssLoading,
    cardLoading,
  };
};
