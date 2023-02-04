import {useAppSelector} from '../../../store/store';

export const useDetailsInitialValue = () => {
  const {sitterInfo, petPreference, petPerDay, yourHome, skills} =
    useAppSelector(state => state.details);
  const home = yourHome !== null && yourHome;
  const id = home?.HomeAttributes?.map(
    (item: any) => item?.homeAttributeTypeId,
  );
  const skillTypeId = skills?.map((item: any) => item?.skillTypeId);
  let ownerAtt = id && id.filter(num => num >= 1 && num <= 8);
  let hostAtt = id && id.filter(num => num >= 9);
  const detailsInitialValue = {
    headline: sitterInfo ? sitterInfo.headline : '',
    yearsOfExperience: sitterInfo ? sitterInfo.yearsOfExperience : 0,
    experienceDescription: sitterInfo ? sitterInfo.experienceDescription : '',
    // environmentDescription: sitterInfo ? sitterInfo.environmentDescription : '',
    // scheduleDescription: sitterInfo ? sitterInfo.scheduleDescription : '',
    // about: sitterInfo ? sitterInfo.about : '',
    skills: skillTypeId ? skillTypeId : [],
    smallDog: petPreference?.smallDog ? petPreference?.smallDog : false,
    mediumDog: petPreference?.mediumDog ? petPreference?.mediumDog : false,
    largeDog: petPreference?.largeDog ? petPreference?.largeDog : false,
    giantDog: petPreference?.giantDog ? petPreference?.giantDog : false,
    cat: petPreference?.cat ? petPreference?.cat : false,
    petPerDay: petPerDay,
    homeType: home?.homeType ? home?.homeType : '',
    yardType: home?.yardType ? home?.yardType : '',
    ownerAttributes: ownerAtt ? ownerAtt : [],
    hostAttributes: hostAtt ? hostAtt : [],
  };
  return {detailsInitialValue};
};
