import {useEffect} from 'react';
import {getAvailability} from '../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {getPetPreference} from '../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import {getYourHome} from '../../../store/slices/onBoarding/setUpService/yourHome/getYourHome';
import {useAppDispatch, useAppSelector} from '../../../store/store';

export const useServiceSetup = (serviceId: any) => {
  const dispatch = useAppDispatch();
  const {petPreference, loading: petPreferenceLoader} = useAppSelector(
    (state: any) => state?.petPreference,
  );
  const {availability, loading: availabilityLoader} = useAppSelector(
    (state: any) => state?.availability,
  );
  const {yourHome, loading: yourHomeLoader} = useAppSelector(
    (state: any) => state?.yourHome,
  );
  useEffect(() => {
    petPreference === null && dispatch(getPetPreference());
  }, [petPreference, dispatch]);
  useEffect(() => {
    availability === null && dispatch(getAvailability(serviceId[0]));
  }, [availability, dispatch]);
  useEffect(() => {
    yourHome === null && dispatch(getYourHome());
  }, [dispatch, yourHome]);
  return {petPreferenceLoader, availabilityLoader, yourHomeLoader};
};
