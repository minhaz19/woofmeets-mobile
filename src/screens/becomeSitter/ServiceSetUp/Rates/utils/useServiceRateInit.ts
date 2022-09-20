import {useAppSelector} from '../../../../../store/store';

export const useServiceRateInit = () => {
  const {fieldValue} = useAppSelector(state => state.fieldValue);
  return {
    baserate: fieldValue && fieldValue[0]?.amount ? fieldValue[0].amount : null,
    sixtyMinRate: null,
    holidayrate:
      fieldValue && fieldValue[1]?.amount ? fieldValue[1].amount : null,
    additionaldog:
      fieldValue && fieldValue[2]?.amount ? fieldValue[2].amount : null,
    puppyRate: null,
    catcare: fieldValue && fieldValue[3]?.amount ? fieldValue[3].amount : null,
    additionalCat: null,
    extendedStayRate: null,
    bathingGrooming: null,
    pickUpDropOff: null,
    updateRate: false,
  };
};
