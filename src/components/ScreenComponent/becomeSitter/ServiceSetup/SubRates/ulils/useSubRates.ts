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
      convertedValue: Number(baseRateWatch) * Number(item.percentage),
    }));
    setRates(modRates);
  }, [baseRateWatch, rateFields]);

  useMemo(() => {
    const checkCheck = rateFields?.map((elm: any) => ({
      serviceTypeId: elm.id,
      percentage: elm.percentage,
    }));

    const submittedValue = fieldValue?.map((item: any) => item.amount);
    const calculatedValue = checkCheck?.map(
      (it: any) => Number(baseRateWatch) * it.percentage,
    );
    // const checkFields =
    //   checkCheck &&
    //   fieldValue?.map(
    //     (_: any) =>
    //       fieldValue?.find((it: any) => it.modRatesId === 1)?.amount *
    //         checkCheck?.filter(
    //           (fi: any) =>
    //             fi.serviceTypeId ===
    //             fieldValue?.find(
    //               (it: any) => it.modRatesId === fi.serviceTypeId,
    //             )?.modRatesId,
    //         )[0]?.percentage ===
    //       fieldValue?.filter(
    //         (el: any) =>
    //           el.modRatesId ===
    //           checkCheck?.find((fi: any) => fi.serviceTypeId === el.modRatesId)
    //             ?.serviceTypeId,
    //       )[0]?.amount,
    //   );

    // const validateCheck =
    //   checkFields &&
    //   checkFields?.filter((item: boolean) => item === false).length >= 2;
    // if (validateCheck === true) {
    //   setChecked(true);
    //   setUpdateRates(true);
    // } else if (validateCheck === false) {
    //   setChecked(false);
    //   setUpdateRates(false);
    // }

    const validateCheck = areEqual(submittedValue, calculatedValue);
    if (validateCheck === true) {
      setChecked(true);
      setUpdateRates(false);
    } else if (validateCheck === false) {
      setChecked(false);
      setUpdateRates(true);
    }
  }, [baseRateWatch, fieldValue, rateFields]);

  useMemo(() => {
    if (checked === true) {
      if (updateRates === false) {
        setChecked(false);
      }
    } else if (checked === false) {
      if (updateRates === true) {
        setChecked(true);
      }
    }
  }, [checked, updateRates]);
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
