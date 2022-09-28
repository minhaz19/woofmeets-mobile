import methods from '../../../../../api/methods';
const postEndpoint = '/pet/create';
const putEndpoint = '/pet/update/';

export const addPetApi = async (data: any, opk: string | null) => {
  const {
    about,
    ageMonth,
    ageYear,
    breeds,
    canLeftAlone,
    canLeftAloneDetails,
    catFriendly,
    catFrinedlyAdditionalDetails,
    childFriendly,
    childFrinedlyAdditionalDetails,
    dogFriendly,
    dogFrinedlyAdditionalDetails,
    energyLevel,
    feedingSchedule,
    feedingScheduleDetails,
    gender,
    houseTrained,
    houseTrainedAdditionalDetails,
    injectionMedication,
    microchipped,
    name,
    pillMedication,
    pottyBreakSchedule,
    pottyBreakScheduleDetails,
    profile_image,
    sitterInstructions,
    spayedOrNeutered,
    topicalMedication,
    type,
    vetInfo,
    weight,
    gallery,
  } = data;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('type', type);
  profile_image !== '' &&
    formData.append('profile_image', {
      name: 'image' + Math.random(),
      type: 'image/jpeg',
      uri: profile_image,
    });
  formData.append('ageMonth', ageMonth);
  formData.append('ageYear', ageYear);
  formData.append('weight', weight);
  formData.append('gender', gender);
  formData.append('about', about);
  formData.append('breeds', JSON.stringify(breeds));
  formData.append('canLeftAlone', canLeftAlone);
  formData.append('canLeftAloneDetails', canLeftAloneDetails);
  formData.append('energyLevel', energyLevel);
  formData.append('feedingSchedule', feedingSchedule);
  formData.append('feedingScheduleDetails', feedingScheduleDetails);
  formData.append('pottyBreakSchedule', pottyBreakSchedule);
  formData.append('pottyBreakScheduleDetails', pottyBreakScheduleDetails);
  opk === null &&
    gallery?.map((img: string, i: number) =>
      formData.append('gallery', {
        name: 'image' + i,
        type: 'image/jpeg',
        uri: img,
      }),
    );

  formData.append('microchipped', microchipped);
  formData.append('spayedOrNeutered', spayedOrNeutered);
  formData.append('houseTrained', houseTrained);
  formData.append(
    'houseTrainedAdditionalDetails',
    houseTrainedAdditionalDetails,
  );
  formData.append('catFriendly', catFriendly);
  formData.append('catFrinedlyAdditionalDetails', catFrinedlyAdditionalDetails);
  formData.append('childFriendly', childFriendly);
  formData.append(
    'childFrinedlyAdditionalDetails',
    childFrinedlyAdditionalDetails,
  );
  formData.append('dogFriendly', dogFriendly);
  formData.append('dogFrinedlyAdditionalDetails', dogFrinedlyAdditionalDetails);
  formData.append('injectionMedication', injectionMedication);
  formData.append('pillMedication', pillMedication);
  formData.append('topicalMedication', topicalMedication);
  formData.append('sitterInstructions', sitterInstructions);
  formData.append('vetInfo', vetInfo);
  return opk === null
    ? methods._post(postEndpoint, formData)
    : methods._put(`${putEndpoint + opk}`, formData);
};
