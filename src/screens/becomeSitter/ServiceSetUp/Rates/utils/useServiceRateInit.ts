import {useAppSelector} from '../../../../../store/store';

export const useServiceRateInit = () => {
  const {fieldValue} = useAppSelector(state => state.fieldValue);
  const {ratesMeta} = useAppSelector(state => state.serviceRates);
  console.log('ratexmeta', ratesMeta);
  const baseRate =
    ratesMeta !== null && ratesMeta !== undefined && ratesMeta['base-rate'];
  console.log('base init', baseRate);
  return {
    baserate:
      fieldValue && fieldValue[0]?.amount ? fieldValue[0].amount : baseRate,
    holidayrate:
      fieldValue && fieldValue[1]?.amount
        ? fieldValue[1].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['holiday-rate'])
        : null,
    additionaldog:
      fieldValue && fieldValue[2]?.amount
        ? fieldValue[2].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['additional-dog'])
        : null,
    puppyrate:
      fieldValue && fieldValue[3]?.amount
        ? fieldValue[3].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['puppy-rate'])
        : null,
    catcare:
      fieldValue && fieldValue[4]?.amount
        ? fieldValue[4].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['cat-care'])
        : null,
    additionalcat:
      fieldValue && fieldValue[5]?.amount
        ? fieldValue[5].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['additional-cat'])
        : null,
    bathgroomingrate:
      fieldValue && fieldValue[6]?.amount
        ? fieldValue[6].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['bath-grooming-rate'])
        : null,
    extendedCare:
      fieldValue && fieldValue[7]?.amount
        ? fieldValue[7].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['extended-Care'])
        : null,
    extendedstayrate:
      fieldValue && fieldValue[10]?.amount
        ? fieldValue[10].amount
        : baseRate.length > 0
        ? Number(baseRate * ratesMeta['extended-stay-rate'])
        : null,
  };
};
