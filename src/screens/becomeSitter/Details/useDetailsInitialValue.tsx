import {useAppSelector} from '../../../store/store';

export const useDetailsInitalValue = () => {
  const sitterInfo = useAppSelector(state => state.details.sitterInfo?.providerDetails);
  const detailsInitalValue = {
    headline: sitterInfo ? sitterInfo.headline : '',
    yearsOfExperience: sitterInfo
      ? sitterInfo.yearsOfExperience
      : 0,
    experienceDescription: sitterInfo ? sitterInfo.experienceDescription : '',
    environmentDescription: sitterInfo ? sitterInfo.environmentDescription : '',
    scheduleDescription: sitterInfo ? sitterInfo.scheduleDescription : '',
    // about: sitterInfo ? sitterInfo.scheduleDescription : '',
  };
  return detailsInitalValue;
};
