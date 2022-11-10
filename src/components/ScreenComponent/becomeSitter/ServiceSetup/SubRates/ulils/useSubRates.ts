import {useMemo, useState} from 'react';
import {useAppSelector} from '../../../../../../store/store';
function areEqual(arr1: any, arr2: any) {
  let N = arr1?.length;
  let M = arr2?.length;
  if (N !== M) {
    return false;
  }
  let map = new Map();
  let count = 0;
  for (let i = 0; i < N; i++) {
    if (map.get(arr1[i]) == null) {
      map.set(arr1[i], 1);
    } else {
      count = map.get(arr1[i]);
      count++;
      map.set(arr1[i], count);
    }
  }
  for (let i = 0; i < N; i++) {
    // If there is an element in arr2[], but
    // not in arr1[]
    if (!map.has(arr2[i])) {
      return false;
    }
    if (map.get(arr2[i]) === 0) {
      return false;
    }

    count = map.get(arr2[i]);
    --count;
    map.set(arr2[i], count);
  }

  return true;
}
export const useSubRates = (rateFields: any, watch: any) => {
  const [showAdditionalRates, setShowAdditionalRates] = useState(true);
  const [updateRates, setUpdateRates] = useState(false);
  const [rates, setRates] = useState([]);
  const [checked, setChecked] = useState(false);
  const {fieldValue} = useAppSelector(state => state.fieldValue);

  const baseRateWatch = watch('baserate');
  const handlePress = () => {
    setShowAdditionalRates(!showAdditionalRates);
  };
  useMemo(() => {
    const modRates = rateFields?.map((item: any) => ({
      ...item,
      percentage: Number(item.percentage),
      convertedValue: (Number(baseRateWatch) * Number(item.percentage)).toFixed(
        2,
      ),
    }));
    setRates(modRates);
  }, [baseRateWatch, rateFields]);

  useMemo(() => {
    const checkCheck = rateFields?.map((elm: any) => ({
      serviceTypeId: elm.id,
      percentage: elm.percentage,
    }));
    const submittedValue = fieldValue?.map((item: any) => item.amount);
    const calculatedValue = checkCheck?.map((it: any) => {
      return Number(
        (
          Number(baseRateWatch) * (it.serviceTypeId === 1 ? 1 : it.percentage)
        ).toFixed(2),
      );
    });

    const validateCheck =
      submittedValue === undefined
        ? null
        : areEqual(submittedValue, calculatedValue);
    if (validateCheck === true) {
      // setChecked(true);
      setUpdateRates(false);
    } else if (validateCheck === false && validateCheck !== null) {
      // setChecked(false);
      setUpdateRates(true);
    }
  }, [fieldValue, rateFields]);

  // useMemo(() => {
  //   if (checked === true) {
  //     if (updateRates === false) {
  //       setChecked(false);
  //     }
  //   } else if (checked === false) {
  //     if (updateRates === true) {
  //       setChecked(true);
  //     }
  //   }
  // }, [checked, updateRates]);
  return {
    baseRateWatch,
    handlePress,
    rates,
    showAdditionalRates,
    updateRates,
    setUpdateRates,
    checked,
  };
};
