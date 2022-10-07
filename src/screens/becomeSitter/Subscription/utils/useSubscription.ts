/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {getCurrentplan} from '../../../../store/slices/payment/Subscriptions/CurrentSubscription/currentPlanAction';
import {getSubscription} from '../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
type StackParamList = {
  BasicBackgroundCheck: {foo: string; onBar: () => void} | undefined;
  PlanCheckout:
    | {
        foo: string;
        onBar: () => void;
      }
    | undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>;
const endpoint = '/subscriptions/check-basic-verification-payment';
const subscriptionEndpoint = '/subscriptions/subscribe/';
const defaultCardEndpoint = '/stripe-payment-method/default-card-info';
export const useSubscription = () => {
  const [sequence, setSequence] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const {loading: planLoading, currentPlan} = useAppSelector(
    state => state.currentPlan,
  );
  const {loading: pLoading, request} = useApi(methods._post);
  const {loading: cardLoading, request: cardRequest} = useApi(methods._get);
  const navigation = useNavigation<NavigationProps>();
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
    if (sequence === 1) {
      const result = await methods._get(endpoint);
      if (result.status === 400) {
        // @ts-ignore
        navigation.navigate('PaymentMethod', {sequence: sequence});
      } else if (result.status === 200) {
        const cardResponse = await cardRequest(defaultCardEndpoint);
        const subscriptionResult = await request(
          `${subscriptionEndpoint}?priceId=${sequence}&cardId=${cardResponse.data.data.id}`,
        );
        subscriptionResult.ok &&
          (await dispatch(getCurrentplan()),
          // @ts-ignore
          navigation.navigate('SubscriptionScreen'));
      }
    } else {
      // @ts-ignore
      navigation.navigate('PaymentMethod', {sequence: sequence});
    }
  };
  useEffect(() => {
    currentPlan === null && dispatch(getCurrentplan());
    (currentPlan === undefined || currentPlan === null || plans === null) &&
      dispatch(getSubscription());
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
  };
};
