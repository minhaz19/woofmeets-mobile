import {CancelToken} from 'apisauce';
import {useEffect} from 'react';
import {
  getAttributesPreference,
  getSkillsData,
  getUserDetailsPreference,
} from '../../../../../store/slices/profile/details';
import {useAppDispatch} from '../../../../../store/store';

export const useDetailsUtils = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const source = CancelToken.source();
    dispatch(getUserDetailsPreference());
    dispatch(getAttributesPreference());
    dispatch(getSkillsData());
    return () => {
      source.cancel();
    };
  }, []);

  return {};
};
