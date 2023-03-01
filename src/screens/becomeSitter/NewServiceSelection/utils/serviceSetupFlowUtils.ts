import {CancelToken} from 'apisauce';
import {useEffect} from 'react';
import { getNewOnboarding } from '../../../../store/slices/onBoarding/newOnboardingApi/newOnboardingAction';
import { getContactInfo } from '../../../../store/slices/profile/contact';
import {getSkillsData} from '../../../../store/slices/profile/details';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

export const useServiceSetUpFlow = () => {
  const dispatch = useAppDispatch();
  const {userServicesLoading, userServices} = useAppSelector(
    state => state.services,
  );
  const {isSelectedSection} = useAppSelector(state => state.serviceSetupFlow);

  useEffect(() => {
    const source = CancelToken.source();
    if (userServices?.[0]?.id) {
      dispatch(getNewOnboarding(userServices?.[0]?.id));
    }
    dispatch(getSkillsData());
    dispatch(getContactInfo());
    return () => {
      source.cancel();
    };
  }, []);
  return {isSelectedSection, userServicesLoading, userServices};
};
