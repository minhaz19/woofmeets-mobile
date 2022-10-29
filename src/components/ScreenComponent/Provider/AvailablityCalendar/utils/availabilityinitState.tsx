export const availabilityDayInit = (serviceDays: any) => {
  const boarding = serviceDays?.filter(
    (item: {service: {serviceTypeId: number}}) =>
      item.service.serviceTypeId === 1,
  );
  const houseSitting = serviceDays?.filter(
    (item: {service: {serviceTypeId: number}}) =>
      item.service.serviceTypeId === 2,
  );
  const dropInVisit = serviceDays?.filter(
    (item: {service: {serviceTypeId: number}}) =>
      item.service.serviceTypeId === 3,
  );
  const doggyDayCare = serviceDays?.filter(
    (item: {service: {serviceTypeId: number}}) =>
      item.service.serviceTypeId === 4,
  );
  const dogWalking = serviceDays?.filter(
    (item: {service: {serviceTypeId: number}}) =>
      item.service.serviceTypeId === 5,
  );
  return {
    '1': {
      sat: boarding?.length > 0 ? boarding[0].sat : false,
      sun: boarding?.length > 0 ? boarding[0].sun : false,
      mon: boarding?.length > 0 ? boarding[0].mon : false,
      wed: boarding?.length > 0 ? boarding[0].wed : false,
      thu: boarding?.length > 0 ? boarding[0].thu : false,
      tue: boarding?.length > 0 ? boarding[0].tue : false,
      fri: boarding?.length > 0 ? boarding[0].fri : false,
      putServiceId: boarding?.length > 0 ? boarding[0].id : null,
    },

    '2': {
      putServiceId: houseSitting?.length > 0 ? houseSitting[0].id : null,
      sat: houseSitting?.length > 0 ? houseSitting[0].sat : false,
      sun: houseSitting?.length > 0 ? houseSitting[0].sun : false,
      mon: houseSitting?.length > 0 ? houseSitting[0].mon : false,
      wed: houseSitting?.length > 0 ? houseSitting[0].wed : false,
      thu: houseSitting?.length > 0 ? houseSitting[0].thu : false,
      tue: houseSitting?.length > 0 ? houseSitting[0].tue : false,
      fri: houseSitting?.length > 0 ? houseSitting[0].fri : false,
    },
    '3': {
      putServiceId: dropInVisit?.length > 0 ? dropInVisit[0].id : null,
      sat: dropInVisit?.length > 0 ? dropInVisit[0].sat : false,
      sun: dropInVisit?.length > 0 ? dropInVisit[0].sun : false,
      mon: dropInVisit?.length > 0 ? dropInVisit[0].mon : false,
      wed: dropInVisit?.length > 0 ? dropInVisit[0].wed : false,
      thu: dropInVisit?.length > 0 ? dropInVisit[0].thu : false,
      tue: dropInVisit?.length > 0 ? dropInVisit[0].tue : false,
      fri: dropInVisit?.length > 0 ? dropInVisit[0].fri : false,
    },
    '4': {
      putServiceId: doggyDayCare?.length > 0 ? doggyDayCare[0].id : null,
      sat: doggyDayCare?.length > 0 ? doggyDayCare[0].sat : false,
      sun: doggyDayCare?.length > 0 ? doggyDayCare[0].sun : false,
      mon: doggyDayCare?.length > 0 ? doggyDayCare[0].mon : false,
      wed: doggyDayCare?.length > 0 ? doggyDayCare[0].wed : false,
      thu: doggyDayCare?.length > 0 ? doggyDayCare[0].thu : false,
      tue: doggyDayCare?.length > 0 ? doggyDayCare[0].tue : false,
      fri: doggyDayCare?.length > 0 ? doggyDayCare[0].fri : false,
    },
    '5': {
      putServiceId: dogWalking?.length > 0 ? dogWalking[0].id : null,
      sat: dogWalking?.length > 0 ? dogWalking[0].sat : false,
      sun: dogWalking?.length > 0 ? dogWalking[0].sun : false,
      mon: dogWalking?.length > 0 ? dogWalking[0].mon : false,
      wed: dogWalking?.length > 0 ? dogWalking[0].wed : false,
      thu: dogWalking?.length > 0 ? dogWalking[0].thu : false,
      tue: dogWalking?.length > 0 ? dogWalking[0].tue : false,
      fri: dogWalking?.length > 0 ? dogWalking[0].fri : false,
    },
  };
};
