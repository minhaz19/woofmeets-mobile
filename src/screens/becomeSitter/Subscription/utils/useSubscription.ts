/* eslint-disable react-hooks/exhaustive-deps */

import {useNavigation} from '@react-navigation/native';
import {CancelToken} from 'apisauce';
// import {ApiResponse} from 'apisauce';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {getCurrentplan} from '../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {getSubscription} from '../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {baseUrlV} from '../../../../utils/helpers/httpRequest';

// const endpoint = '/subscriptions/check-basic-verification-payment';
const subscriptionEndpoint = `${baseUrlV}/v1/subscriptions/subscribe?`;
// const defaultCardEndpoint = '/stripe-payment-method/default-card-info';
export const useSubscription = (opk: string) => {
  const uuid = Math.random().toString(36).substring(2, 36);
  const [sequence, setSequence] = useState<number>(0);
  const [ssLoading, setSSloading] = useState(false);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const {sitterData} = useAppSelector(state => state.initial);

  const {loading: planLoading, currentPlan} = useAppSelector(
    state => state.currentPlan,
  );
  const {loading: pLoading, request} = useApi(methods._idempt_post);
  // const {loading: cardLoading, request: cardRequest} = useApi(methods._get);
  const navigation = useNavigation<any>();
  const formattedPackageRate = plans?.map((item: any) => ({
    id: item.id,
    sequence: item.id,
    title: item.name[0].toUpperCase() + item.name.slice(1),
    description: item.features[0],
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
    if (opk === 'current_plan') {
      Alert.alert(
        'Subscription',
        "You havn't completed your pet sitter onboarding yet. Please complete sitter onboarding and then choose subscription",
      );
    } else if (
      sitterData[1].isCompleted &&
      sitterData[2].isCompleted &&
      sitterData[3].isCompleted
    ) {
      const source = CancelToken.source();

      if (sequence === 1) {
        const cardId = null;
        const subscriptionResult = await request(
          `${subscriptionEndpoint}priceId=${sequence}&cardId=${cardId}`,
          {},
          uuid,
        );
        if (subscriptionResult.ok) {
          await dispatch(getCurrentplan(source));
          navigation.navigate('SubscriptionScreen');
        }
      } else if (sequence === 2 || sequence === 3) {
        // @ts-ignore
        navigation.navigate('PaymentMethod', {sequence: sequence});
        setSSloading(false);
      } else {
        Alert.alert('Please select a plan ');
      }
    } else {
      Alert.alert(
        'Subscription',
        'Please complete all the sitter onboarding steps first',
      );
    }
  };
  useEffect(() => {
    const source = CancelToken.source();
    if (currentPlan === null || currentPlan === undefined) {
      dispatch(getCurrentplan(source));
    }
    if ((currentPlan === null || currentPlan === undefined) && plans === null) {
      dispatch(getSubscription());
    }

    return () => {
      source.cancel();
    };
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
    // cardLoading,
  };
};
