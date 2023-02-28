export const useServiceRateInit = (fieldValue: any, ratesMeta: any) => {
  const baseRate =
    ratesMeta !== null && ratesMeta !== undefined ? ratesMeta['base-rate'] : 0;
  const formateRatesMeta = ratesMeta !== null && ratesMeta;

  return {
    baserate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 1)
            ?.amount
        : baseRate,
    holidayrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 3)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['holiday-rate'])
        : null,
    additionaldog:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 2)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['additional-dog'])
        : null,
    puppyrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 5)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['puppy-rate'])
        : null,
    catcare:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 4)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['cat-care'])
        : null,
    additionalcat:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 6)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['additional-cat'])
        : null,
    bathgroomingrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 8)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['bath-grooming-rate'])
        : null,
    extendedCare:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 9)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['extended-Care'])
        : null,
    extendedstayrate:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find((item: {modRatesId: number}) => item.modRatesId === 7)
            ?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['extended-stay-rate'])
        : null,
    sixtyminutes:
      fieldValue && fieldValue.length > 0
        ? fieldValue.find(
            (item: {modRatesId: number}) => item.modRatesId === 12,
          )?.amount
        : typeof baseRate === 'number'
        ? Number(baseRate) * Number(formateRatesMeta['sixty-minutes'])
        : null,
  };
};
