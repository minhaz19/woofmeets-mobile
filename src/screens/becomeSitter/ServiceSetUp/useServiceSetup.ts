/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {getAvailability} from '../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {getPetPreference} from '../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import {useAppDispatch, useAppSelector} from '../../../store/store';

export const useServiceSetup = (serviceId: any) => {
  const dispatch = useAppDispatch();
  const {petPreference, loading: petPreferenceLoader} = useAppSelector(
    (state: any) => state?.petPreference,
  );
  const {availability, loading: availabilityLoader} = useAppSelector(
    (state: any) => state?.availability,
  );
  useEffect(() => {
    petPreference === null && dispatch(getPetPreference());
  }, [petPreference, dispatch]);
  useEffect(() => {
    availability === null && dispatch(getAvailability(serviceId[0]));
  }, [availability, dispatch]);

  return {petPreferenceLoader, availabilityLoader};
};
