import {useAppSelector} from '../../../../../store/store';

export const useServiceRateInit = () => {
  const {fieldValue} = useAppSelector(state => state.fieldValue);
  console.log('field value', fieldValue);
  return {
    baserate: fieldValue && fieldValue[0]?.amount ? fieldValue[0].amount : null,
    holidayrate:
      fieldValue && fieldValue[1]?.amount ? fieldValue[1].amount : null,
    additionaldog:
      fieldValue && fieldValue[2]?.amount ? fieldValue[2].amount : null,
    puppyrate:
      fieldValue && fieldValue[3]?.amount ? fieldValue[3].amount : null,
    catcare: fieldValue && fieldValue[4]?.amount ? fieldValue[4].amount : null,
    additionalcat:
      fieldValue && fieldValue[5]?.amount ? fieldValue[5].amount : null,
    bathgroomingrate:
      fieldValue && fieldValue[6]?.amount ? fieldValue[6].amount : null,
    extendedCare:
      fieldValue && fieldValue[7]?.amount ? fieldValue[7].amount : null,
    costadjustment:
      fieldValue && fieldValue[8]?.amount ? fieldValue[8].amount : null,
    discountadjustment:
      fieldValue && fieldValue[9]?.amount ? fieldValue[9].amount : null,
    extendedstayrate:
      fieldValue && fieldValue[10]?.amount ? fieldValue[10].amount : null,
  };
};
