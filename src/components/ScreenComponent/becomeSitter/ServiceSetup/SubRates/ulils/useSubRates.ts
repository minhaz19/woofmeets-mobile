import {useMemo, useState} from 'react';
import {useAppSelector} from '../../../../../../store/store';

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
    console.log('calling memo service one');
    const modRates = rateFields?.map((item: any) => ({
      ...item,
      percentage: Number(item.percentage),
    }));
    setRates(modRates);
  }, [rateFields]);
  console.log('reate fiels', rateFields);
  useMemo(() => {
    console.log('calling memo service tow');
    const checkFields = fieldValue?.map(
      (_: any, index: number) =>
        (fieldValue[0].amount / 100) * (index * 5) === fieldValue[index].amount,
    );
    const validateCheck =
      checkFields &&
      checkFields?.filter((item: boolean) => item === false).length >= 2;
    if (validateCheck === true) {
      setChecked(true);
      setUpdateRates(true);
    } else if (validateCheck === false) {
      setChecked(false);
      setUpdateRates(false);
    }
  }, [fieldValue]);

  useMemo(() => {
    console.log('calling memo service three');
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
