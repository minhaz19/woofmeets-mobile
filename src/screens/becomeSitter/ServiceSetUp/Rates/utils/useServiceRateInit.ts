import {useAppSelector} from '../../../../../store/store';

export const useServiceRateInit = () => {
  const {fieldValue} = useAppSelector(state => state.fieldValue);
  const {ratesMeta} = useAppSelector(
    state => state.serviceRates,
  );
  const baseRate =
    ratesMeta !== null && ratesMeta !== undefined && ratesMeta['base-rate'];
  console.log(
    'something',
    Number(baseRate * Number(ratesMeta['holiday-rate'])),
    ratesMeta['holiday-rate'],
  );
  return {
    baserate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 1)
            .amount
        : baseRate,
    holidayrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 3)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['holiday-rate'])
        : null,
    additionaldog:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 2)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['additional-dog'])
        : null,
    puppyrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 5)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['puppy-rate'])
        : null,
    catcare:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 4)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['cat-care'])
        : null,
    additionalcat:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 6)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['additional-cat'])
        : null,
    bathgroomingrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 8)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['bath-grooming-rate'])
        : null,
    extendedCare:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 9)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['extended-Care'])
        : null,
    extendedstayrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 7)
            .amount
        : baseRate.length > 0
        ? Number(baseRate) * Number(ratesMeta['extended-stay-rate'])
        : null,
  };
};
