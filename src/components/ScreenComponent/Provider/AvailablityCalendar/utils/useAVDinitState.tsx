import {useAppSelector} from '../../../../../store/store';

export const useAvailabilityDayInit = () => {
  const {userServices} = useAppSelector(state => state.services);
  const boarding = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  )?.AvailableDay[0];
  const houseSitting = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  )?.AvailableDay[0];
  const dropInVisit = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  )?.AvailableDay[0];
  const doggyDayCare = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  )?.AvailableDay[0];
  const dogWalking = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  )?.AvailableDay[0];
  console.log('ini', boarding);
  return {
    '1': {
      sat: typeof boarding?.sat !== 'boolean' ? boarding.sat : false,
      sun: typeof boarding?.sun !== 'boolean' ? boarding.sun : false,
      mon: typeof boarding?.mon !== 'boolean' ? boarding.mon : false,
      wed: typeof boarding?.wed !== 'boolean' ? boarding.wed : false,
      thu: typeof boarding?.thu !== 'boolean' ? boarding.thu : false,
      tue: typeof boarding?.tue !== 'boolean' ? boarding.tue : false,
      fri: typeof boarding?.fri !== 'boolean' ? boarding.fri : false,
    },

    '2': {
      sat: typeof houseSitting?.sat !== 'boolean' ? houseSitting.sat : false,
      sun: typeof houseSitting?.sun !== 'boolean' ? houseSitting.sun : false,
      mon: typeof houseSitting?.mon !== 'boolean' ? houseSitting.mon : false,
      wed: typeof houseSitting?.wed !== 'boolean' ? houseSitting.wed : false,
      thu: typeof houseSitting?.thu !== 'boolean' ? houseSitting.thu : false,
      tue: typeof houseSitting?.tue !== 'boolean' ? houseSitting.tue : false,
      fri: typeof houseSitting?.fri !== 'boolean' ? houseSitting.fri : false,
    },
    '3': {
      sat: typeof dropInVisit?.sat !== 'boolean' ? dropInVisit.sat : false,
      sun: typeof dropInVisit?.sun !== 'boolean' ? dropInVisit.sun : false,
      mon: typeof dropInVisit?.mon !== 'boolean' ? dropInVisit.mon : false,
      wed: typeof dropInVisit?.wed !== 'boolean' ? dropInVisit.wed : false,
      thu: typeof dropInVisit?.thu !== 'boolean' ? dropInVisit.thu : false,
      tue: typeof dropInVisit?.tue !== 'boolean' ? dropInVisit.tue : false,
      fri: typeof dropInVisit?.fri !== 'boolean' ? dropInVisit.fri : false,
    },
    '4': {
      sat: typeof doggyDayCare?.sat !== 'boolean' ? doggyDayCare.sat : false,
      sun: typeof doggyDayCare?.sun !== 'boolean' ? doggyDayCare.sun : false,
      mon: typeof doggyDayCare?.mon !== 'boolean' ? doggyDayCare.mon : false,
      wed: typeof doggyDayCare?.wed !== 'boolean' ? doggyDayCare.wed : false,
      thu: typeof doggyDayCare?.thu !== 'boolean' ? doggyDayCare.thu : false,
      tue: typeof doggyDayCare?.tue !== 'boolean' ? doggyDayCare.tue : false,
      fri: typeof doggyDayCare?.fri !== 'boolean' ? doggyDayCare.fri : false,
    },
    '5': {
      sat: typeof dogWalking?.sat !== 'boolean' ? dogWalking.sat : false,
      sun: typeof dogWalking?.sun !== 'boolean' ? dogWalking.sun : false,
      mon: typeof dogWalking?.mon !== 'boolean' ? dogWalking.mon : false,
      wed: typeof dogWalking?.wed !== 'boolean' ? dogWalking.wed : false,
      thu: typeof dogWalking?.thu !== 'boolean' ? dogWalking.thu : false,
      tue: typeof dogWalking?.tue !== 'boolean' ? dogWalking.tue : false,
      fri: typeof dogWalking?.fri !== 'boolean' ? dogWalking.fri : false,
    },
  };
};
