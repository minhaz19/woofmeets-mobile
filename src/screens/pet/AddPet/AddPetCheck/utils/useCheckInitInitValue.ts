import {useAppSelector} from '../../../../../store/store';

export const useCheckInfiValue = (opk: string | null) => {
  const {singlePet} = useAppSelector(state => state.singlePet);
  return {
    microchipped:
      opk !== null && singlePet?.microchipped ? singlePet.microchipped : null,
    spayedOrNeutered:
      opk !== null && singlePet?.spayedOrNeutered
        ? singlePet.spayedOrNeutered
        : null,
    houseTrained:
      opk !== null && singlePet?.houseTrained ? singlePet.houseTrained : '',
    houseTrainedAdditionalDetails:
      opk !== null && singlePet?.houseTrainedAdditionalDetails
        ? singlePet.houseTrainedAdditionalDetails
        : '',

    childFriendly:
      opk !== null && singlePet?.childFriendly ? singlePet.childFriendly : '',
    childFrinedlyAdditionalDetails:
      opk !== null && singlePet?.childFrinedlyAdditionalDetails
        ? singlePet.childFrinedlyAdditionalDetails
        : '',
    dogFriendly:
      opk !== null && singlePet?.dogFriendly ? singlePet.dogFriendly : '',
    dogFrinedlyAdditionalDetails:
      opk !== null && singlePet?.dogFrinedlyAdditionalDetails
        ? singlePet.dogFrinedlyAdditionalDetails
        : '',
    catFriendly:
      opk !== null && singlePet?.catFriendly ? singlePet.catFriendly : '',
    catFrinedlyAdditionalDetails:
      opk !== null && singlePet?.catFrinedlyAdditionalDetails
        ? singlePet.catFrinedlyAdditionalDetails
        : '',
    about: opk !== null && singlePet?.about ? singlePet.about : '',
    energyLevel:
      opk !== null && singlePet?.energyLevel ? singlePet.energyLevel : '',
    feedingSchedule:
      opk !== null && singlePet?.feedingSchedule
        ? singlePet.feedingSchedule
        : '',
    feedingScheduleDetails:
      opk !== null && singlePet?.feedingScheduleDetails
        ? singlePet.feedingScheduleDetails
        : '',
    pottyBreakSchedule:
      opk !== null && singlePet?.pottyBreakSchedule
        ? singlePet.pottyBreakSchedule
        : '',
    pottyBreakScheduleDetails:
      opk !== null && singlePet?.pottyBreakScheduleDetails
        ? singlePet.pottyBreakScheduleDetails
        : '',
    canLeftAlone:
      opk !== null && singlePet?.canLeftAlone ? singlePet.canLeftAlone : '',
    canLeftAloneDetails:
      opk !== null && singlePet?.canLeftAloneDetails
        ? singlePet.canLeftAloneDetails
        : '',
    // pill: opk !== null && singlePet?.pill ? singlePet.pill : false,
    // pillMedication:
    //   opk !== null && singlePet?.pillMedication ? singlePet.pillMedication : '',
    // topical: opk !== null && singlePet?.topical ? singlePet.topical : false,
    // topicalMedication:
    //   opk !== null && singlePet?.topicalMedication
    //     ? singlePet.topicalMedication
    //     : '',
    // injection:
    //   opk !== null && singlePet?.injection ? singlePet.injection : false,
    // injectionMedication:
    //   opk !== null && singlePet?.injectionMedication
    //     ? singlePet.injectionMedication
    //     : '',
    // sitterInstructions:
    //   opk !== null && singlePet?.sitterInstructions
    //     ? singlePet.sitterInstructions
    //     : '',
    // vetInfo: opk !== null && singlePet?.vetInfo ? singlePet.vetInfo : '',
    // gallery:
    //   opk !== null && singlePet?.petGallery
    //     ? singlePet.petGallery.map((item: any) => item.imageSrc.url)
    //     : [],

    // imageInfo:
    //   opk !== null &&
    //   singlePet?.petGallery.map((item: any) => {
    //     return {
    //       id: item.id,
    //       url: item.imageSrc.url,
    //       caption: item.caption,
    //     };
    //   }),
    // petOpk: opk !== null && singlePet?.opk && singlePet.opk,
  };
};
