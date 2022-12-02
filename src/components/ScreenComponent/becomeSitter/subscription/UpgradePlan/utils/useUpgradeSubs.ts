/* eslint-disable react-hooks/exhaustive-deps */

import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {getSubscription} from '../../../../../../store/slices/payment/Subscriptions/SubscriptionPlans/subscriptionAction';
import {useAppDispatch, useAppSelector} from '../../../../../../store/store';
// import {baseUrlV} from '../../../../../../utils/helpers/httpRequest';
// `${baseUrlV}/v3/subscriptions/subscribe?`;
export const useUpgradeSubscription = () => {
  const [sequence, setSequence] = useState<number>(0);
  const [ssLoading, setSSloading] = useState(false);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);

  const navigation = useNavigation<any>();
  const upgradePlans = plans?.filter((item: any) => item.id !== 1);
  const formattedPackageRate = upgradePlans?.map((item: any) => ({
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
    // @ts-ignore
    navigation.navigate('PaymentMethod', {sequence: sequence});
    setSSloading(false);
  };
  useEffect(() => {
    plans === null && dispatch(getSubscription());
  }, []);
  return {
    onPressEvent,
    sequence,
    loading,
    formattedPackageRate,

    handleSubmit,

    ssLoading,
  };
};
