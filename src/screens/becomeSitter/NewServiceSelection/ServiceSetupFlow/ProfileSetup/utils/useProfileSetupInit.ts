import {useAppSelector} from '../../../../../../store/store';
import {replaceHostnameWithCDN} from '../../../../../../utils/helpers/imageOpt/replaceHostnameWithCDN';

export const useProfileSetupInit = () => {
  const {basicInfo, skills, emergencyContact, providerDetails, profileImage} =
    useAppSelector(state => state.newOnboarding);
  const modSkills = skills?.map((item: any) => item?.skillTypeId);
  return {
    profileImage: profileImage
      ? replaceHostnameWithCDN(profileImage, {
          height: 20,
          width: 20,
          quality: 2,
        })
      : '',
    dob: basicInfo?.dob ? basicInfo?.dob : '',
    addressLine1: basicInfo?.addressLine1 ? basicInfo?.addressLine1 : '',
    addressLine2: basicInfo?.addressLine2 ? basicInfo?.addressLine2 : '',
    street: basicInfo?.street ? basicInfo?.street : '',
    city: basicInfo?.city ? basicInfo?.city : '',
    state: basicInfo?.state ? basicInfo?.state : '',
    zipCode: basicInfo?.zipCode ? basicInfo?.zipCode : '',
    countryId: basicInfo?.countryId ? String(basicInfo?.countryId) : '',
    latitude: basicInfo?.latitude ? basicInfo?.latitude : 0,
    longitude: basicInfo?.longitude ? basicInfo?.longitude : 0,

    emergencyContactName: emergencyContact?.name ? emergencyContact?.name : '',
    emergencyPhone: emergencyContact?.phone ? emergencyContact?.phone : '',
    // name: basicInfo?.dob ? basicInfo?.dob : '',
    // email: basicInfo?.dob ? basicInfo?.dob : '',
    // phone: basicInfo?.dob ? basicInfo?.dob : '',
    numberVerified: false,

    headline: providerDetails?.headline ? providerDetails?.headline : '',
    yearsOfExperience: providerDetails?.yearsOfExperience
      ? providerDetails?.yearsOfExperience
      : '',
    experienceDescription: providerDetails?.experienceDescription
      ? providerDetails?.experienceDescription
      : '',
    skills: modSkills ? modSkills : [],
  };
};
