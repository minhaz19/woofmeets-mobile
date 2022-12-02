import {useAppSelector} from '../../../store/store';

export const useDetailsInitalValue = () => {
  const sitterInfo = useAppSelector(
    state => state.details.sitterInfo?.providerDetails,
  );
  const providerSkills = useAppSelector(
    state => state.details.sitterInfo?.providerSkills,
  );
  const provider = useAppSelector(state => state.details.sitterInfo);
  const detailsInitalValue = {
    headline: sitterInfo ? sitterInfo.headline : '',
    yearsOfExperience: sitterInfo ? sitterInfo.yearsOfExperience : 0,
    experienceDescription: sitterInfo ? sitterInfo.experienceDescription : '',
    environmentDescription: sitterInfo ? sitterInfo.environmentDescription : '',
    scheduleDescription: sitterInfo ? sitterInfo.scheduleDescription : '',
    about: sitterInfo ? sitterInfo.about : '',
    first_aid_cpr: providerSkills
      ? providerSkills.find(
          (item: {skillTypeId: number}) => item.skillTypeId === 3,
        )
        ? true
        : false
      : false,
    oral_medication: providerSkills
      ? providerSkills.find(
          (item: {skillTypeId: number}) => item.skillTypeId === 1,
        )
        ? true
        : false
      : false,
    injected_medication: providerSkills
      ? providerSkills.find(
          (item: {skillTypeId: number}) => item.skillTypeId === 5,
        )
        ? true
        : false
      : false,
    daily_exercise: providerSkills
      ? providerSkills.find(
          (item: {skillTypeId: number}) => item.skillTypeId === 2,
        )
        ? true
        : false
      : false,
    senior_pet_experience: providerSkills
      ? providerSkills.find(
          (item: {skillTypeId: number}) => item.skillTypeId === 4,
        )
        ? true
        : false
      : false,
    skills: [],
  };
  return detailsInitalValue;
};
