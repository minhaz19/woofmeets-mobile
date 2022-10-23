export const availabilityDayInit = (userServices: any) => {
  const boarding = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 1,
  );
  const houseSitting = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 2,
  );
  const dropInVisit = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 3,
  );
  const doggyDayCare = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 4,
  );
  const dogWalking = userServices?.find(
    (item: {serviceTypeId: number}) => item.serviceTypeId === 5,
  );
  console.log('baro', boarding);
  return {
    '1': {
      sat:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].sat
          : false,
      sun:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].sun
          : false,
      mon:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].mon
          : false,
      wed:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].wed
          : false,
      thu:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].thu
          : false,
      tue:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].tue
          : false,
      fri:
        boarding?.AvailableDay?.length > 0
          ? boarding.AvailableDay[0].fri
          : false,
      putServiceId:
        boarding?.AvailableDay?.length > 0 ? boarding.AvailableDay[0].id : null,
    },

    '2': {
      putServiceId:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].id
          : null,
      sat:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].sat
          : false,
      sun:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].sun
          : false,
      mon:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].mon
          : false,
      wed:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].wed
          : false,
      thu:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].thu
          : false,
      tue:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].tue
          : false,
      fri:
        houseSitting?.AvailableDay?.length > 0
          ? houseSitting.AvailableDay[0].fri
          : false,
    },
    '3': {
      putServiceId:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].id
          : null,
      sat:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].sat
          : false,
      sun:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].sun
          : false,
      mon:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].mon
          : false,
      wed:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].wed
          : false,
      thu:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].thu
          : false,
      tue:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].tue
          : false,
      fri:
        dropInVisit?.AvailableDay?.length > 0
          ? dropInVisit.AvailableDay[0].fri
          : false,
    },
    '4': {
      putServiceId:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].id
          : null,
      sat:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].sat
          : false,
      sun:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].sun
          : false,
      mon:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].mon
          : false,
      wed:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].wed
          : false,
      thu:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].thu
          : false,
      tue:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].tue
          : false,
      fri:
        doggyDayCare?.AvailableDay?.length > 0
          ? doggyDayCare.AvailableDay[0].fri
          : false,
    },
    '5': {
      putServiceId:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].id
          : null,
      sat:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].sat
          : false,
      sun:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].sun
          : false,
      mon:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].mon
          : false,
      wed:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].wed
          : false,
      thu:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].thu
          : false,
      tue:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].tue
          : false,
      fri:
        dogWalking?.AvailableDay?.length > 0
          ? dogWalking.AvailableDay[0].fri
          : false,
    },
  };
};
