/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {getSubscription} from '../../../../store/slices/onBoarding/Subscriptions/subscriptionAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

export const useSubscription = () => {
  const [sequence, setSequence] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const formattedPackageRate = plans?.map((item: any) => ({
    id: item.id,
    sequence: item.id,
    title: item.displayName,
    description: 'Only 5% Service Fee For All Unlimited Appointments',
    price: item.monthlyRate,
    annualRate: item.annualRate,
    details: item.features?.map((des: any, i: number) => ({
      id: i + 1,
      description: des,
    })),
  }));

  const onPressEvent = (id: number) => {
    setSequence(id);
  };
  useEffect(() => {
    dispatch(getSubscription());
  }, []);
  return {onPressEvent, sequence, loading, formattedPackageRate};
};
