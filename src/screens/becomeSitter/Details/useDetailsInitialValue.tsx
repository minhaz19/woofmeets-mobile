import {useEffect} from 'react';
import {useAppSelector} from '../../../store/store';

export const useDetailsInitalValue = () => {
  const sitterInfo = useAppSelector(state => state.details.sitterInfo);
  useEffect(() => {}, [sitterInfo]);
  const detailsInitalValue = {
    headline: sitterInfo ? sitterInfo.headline : '',
    yearsOfExperience: sitterInfo
      ? sitterInfo.yearsOfExperience?.toString()
      : '',
    experienceDescription: sitterInfo ? sitterInfo.experienceDescription : '',
    environmentDescription: sitterInfo ? sitterInfo.environmentDescription : '',
    scheduleDescription: sitterInfo ? sitterInfo.scheduleDescription : '',
  };
  return detailsInitalValue;
};
