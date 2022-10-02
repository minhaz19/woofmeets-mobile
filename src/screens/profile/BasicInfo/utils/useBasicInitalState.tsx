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
    zipCode: userInfo?.basicInfo?.state ? userInfo?.basicInfo?.state : '',
    countryId: 1,
    name:
      userInfo?.firstName || userInfo?.lastName
        ? `${userInfo.firstName + ' ' + userInfo.lastName}`
        : '',
    dob: userInfo?.basicInfo?.dob
      ? new Date(userInfo?.basicInfo?.dob)?.toDateString()
      : '',
  };
  return basicInitalState;
};
