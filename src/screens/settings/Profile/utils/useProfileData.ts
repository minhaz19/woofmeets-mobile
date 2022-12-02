import {useEffect} from 'react';
import {getUserServices} from '../../../../store/slices/profile/services';
import {getUserProfileInfo} from '../../../../store/slices/userProfile/userProfileAction';
import {useAppDispatch} from '../../../../store/store';

export const useProfileData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);
  return {};
};
