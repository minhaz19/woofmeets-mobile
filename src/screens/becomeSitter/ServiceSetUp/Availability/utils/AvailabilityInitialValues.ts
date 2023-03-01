import * as Yup from 'yup';

export const AvailabilityInitialValues = (availability: any, itemId: any) => {
  const formateAvailability = availability && availability;
  return {
    providerServiceId: itemId,
    selectDay: {
      fri: formateAvailability?.fri ? formateAvailability?.fri : false,
      mon: formateAvailability?.mon ? formateAvailability?.mon : false,
      sat: formateAvailability?.sat ? formateAvailability?.sat : false,
      sun: formateAvailability?.sun ? formateAvailability?.sun : false,
      thu: formateAvailability?.thu ? formateAvailability?.thu : false,
      tue: formateAvailability?.tue ? formateAvailability?.tue : false,
      wed: formateAvailability?.wed ? formateAvailability?.wed : false,
    },
    pottyBreak: formateAvailability?.service
      ? formateAvailability?.service?.pottyBreak
      : '',
  };
};

export const availabilityValidation = Yup.object().shape({
  selectDay: Yup.object()
    .shape({
      fri: Yup.boolean(),
      mon: Yup.boolean(),
      sat: Yup.boolean(),
      sun: Yup.boolean(),
      thu: Yup.boolean(),
      tue: Yup.boolean(),
      wed: Yup.boolean(),
    })
    .test(
      'at-least-one-day-selected',
      'At least one day must be selected',
      value => {
        return Object.values(value).some(selectDay => selectDay === true);
      },
    ),
  pottyBreak: Yup.string().required('Potty Break must be selected'),
});
