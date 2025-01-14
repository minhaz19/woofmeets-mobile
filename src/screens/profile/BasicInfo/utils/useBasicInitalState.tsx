import {format} from 'date-fns';
import {useAppSelector} from '../../../../store/store';

export const useBasicInitalState = () => {
  const {userInfo} = useAppSelector(state => state.userProfile);
  const basicInitalState = {
    profileImage: userInfo?.image?.url ? userInfo?.image?.url : '',
    addressLine1: userInfo?.basicInfo?.addressLine1
      ? userInfo?.basicInfo?.addressLine1
      : '',
    addressLine2: userInfo?.basicInfo?.addressLine2
      ? userInfo?.basicInfo?.addressLine2
      : '',
    city: userInfo?.basicInfo?.city ? userInfo?.basicInfo?.city : '',
    state: userInfo?.basicInfo?.state ? userInfo?.basicInfo?.state : '',
    street: userInfo?.basicInfo?.street ? userInfo?.basicInfo?.street : '',
    zipCode: userInfo?.basicInfo?.zipCode ? userInfo?.basicInfo?.zipCode : '',
    countryId: userInfo?.basicInfo?.countryId
      ? String(userInfo.basicInfo.countryId)
      : '',
    // countryId: userInfo?.countryId ? userInfo.countryId : '',
    name:
      userInfo?.firstName || userInfo?.lastName
        ? `${userInfo.firstName + ' ' + userInfo.lastName}`
        : '',
    dob: userInfo?.basicInfo?.dob
      ? format(new Date(userInfo?.basicInfo?.dob), 'MM/dd/yyyy')
      : '',
    latitude: userInfo?.basicInfo?.latitude
      ? userInfo?.basicInfo?.latitude
      : null,
    longitude: userInfo?.basicInfo?.longitude
      ? userInfo?.basicInfo?.longitude
      : null,
  };
  return basicInitalState;
};
