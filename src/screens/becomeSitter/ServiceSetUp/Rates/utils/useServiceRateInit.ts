import {useAppSelector} from '../../../../../store/store';

export const useServiceRateInit = () => {
  const {fieldValue} = useAppSelector(state => state.fieldValue);
  return {
    baserate: fieldValue && fieldValue[0]?.amount ? fieldValue[0].amount : 0,
    sixtyMinRate: 0,
    holidayrate: fieldValue && fieldValue[1]?.amount ? fieldValue[1].amount : 0,
    additionaldog:
      fieldValue && fieldValue[2]?.amount ? fieldValue[2].amount : 0,
    puppyRate: 0,
    catcare: fieldValue && fieldValue[3]?.amount ? fieldValue[3].amount : 0,
    additionalCat: 0,
    extendedStayRate: 0,
    bathingGrooming: 0,
    pickUpDropOff: 0,
    updateRate: false,
  };
};
