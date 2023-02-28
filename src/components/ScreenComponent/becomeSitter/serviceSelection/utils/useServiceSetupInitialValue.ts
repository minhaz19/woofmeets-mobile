import {useAppSelector} from '../../../../../store/store';

export const useServiceSetupInitialValue = (
  fieldValue: any,
  ratesMeta: any,
) => {
  const {
    availability,
    cancellationPolicyId,
    ServicePetPreference,
    homeType,
    yardType,
    homeAttributes,
  } = useAppSelector(state => state.newOnboarding);
  const baseRate =
    ratesMeta !== null && ratesMeta !== undefined ? ratesMeta['base-rate'] : 0;
  const attributeId = homeAttributes?.map(
    (item: any) => item?.homeAttributeTypeId,
  );
  return {
    baserate:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 1,
          )?.amount
        : baseRate,
    holidayrate:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 3,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['holiday-rate'])).toFixed(2)
        : null,
    additionaldog:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 2,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['additional-dog'])).toFixed(2)
        : null,
    puppyrate:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 5,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['puppy-rate'])).toFixed(2)
        : null,
    catcare:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 4,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['cat-care'])).toFixed(2)
        : null,
    additionalcat:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 6,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['additional-cat'])).toFixed(2)
        : null,
    bathgroomingrate:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 8,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['bath-grooming-rate'])).toFixed(
            2,
          )
        : null,
    extendedCare:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 9,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['extended-Care'])).toFixed(2)
        : null,
    extendedstayrate:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 7,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['extended-stay-rate'])).toFixed(
            2,
          )
        : null,
    sixtyminutes:
      fieldValue && fieldValue?.length > 0
        ? fieldValue?.find(
            (item: {modRatesId: number}) => item.modRatesId === 12,
          )?.amount
        : baseRate
        ? (Number(baseRate) * Number(ratesMeta['sixty-minutes'])).toFixed(2)
        : null,
    selectDay: {
      fri: availability?.fri ? availability?.fri : false,
      mon: availability?.mon ? availability?.mon : false,
      sat: availability?.sat ? availability?.sat : false,
      sun: availability?.sun ? availability?.sun : false,
      thu: availability?.thu ? availability?.thu : false,
      tue: availability?.tue ? availability?.tue : false,
      wed: availability?.wed ? availability?.wed : false,
    },
    pottyBreak: availability?.service ? availability?.service?.pottyBreak : '',
    cancellationPolicy: cancellationPolicyId ? cancellationPolicyId : '',
    preference: {
      smallDog: ServicePetPreference ? ServicePetPreference?.smallDog : false,
      mediumDog: ServicePetPreference ? ServicePetPreference?.mediumDog : false,
      largeDog: ServicePetPreference ? ServicePetPreference?.largeDog : false,
      giantDog: ServicePetPreference ? ServicePetPreference?.giantDog : false,
      cat: ServicePetPreference ? ServicePetPreference?.cat : false,
    },
    petPerDay: ServicePetPreference ? ServicePetPreference?.petPerDay : 0,
    homeType: homeType ? homeType : '',
    yardType: yardType ? yardType : '',
    homeAttributes: attributeId ? attributeId : [],
  };
};
