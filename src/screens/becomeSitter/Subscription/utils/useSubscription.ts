/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {getSubscription} from '../../../../store/slices/payment/Subscriptions/subscriptionAction';
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
export const useSubscription = () => {
  const [sequence, setSequence] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const {loading: pLoading} = useApi(methods._post);
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
  console.log('plans', plans);
  const handleSubmit = async () => {
    if (sequence === 3) {
      // @ts-ignore
      navigation.navigate('PaymentMethod', {sequence: sequence});
    } else {
      // @ts-ignore
      navigation.navigate('PaymentMethod', {sequence: sequence});
    }
  };
  useEffect(() => {
    dispatch(getSubscription());
  }, []);
  return {
    onPressEvent,
    sequence,
    loading,
    formattedPackageRate,
    pLoading,
    handleSubmit,
  };
};
