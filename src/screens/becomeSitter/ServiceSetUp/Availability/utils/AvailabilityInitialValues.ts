import * as Yup from 'yup';

export const AvailabilityInitialValues = (
  serviceAvailabilityId: number,
  availability: any,
) => {
  const {sat, sun, mon, tue, wed, thu, fri} =
    availability !== null && availability;
  const {fulltime, pottyBreak} = availability !== null && availability?.service;
  return {
    providerServiceId: serviceAvailabilityId,
    fri: fri ? fri : false,
    mon: mon ? mon : false,
    sat: sat ? sat : false,
    sun: sun ? sun : false,
    thu: thu ? thu : false,
    tue: tue ? tue : false,
    wed: wed ? wed : false,
    fulltime: fulltime ? fulltime : false,
    pottyBreak: pottyBreak ? pottyBreak : '',
  };
};

export const availabilityValidation = Yup.object().shape({
  fri: Yup.boolean(),
  mon: Yup.boolean(),
  sat: Yup.boolean(),
  sun: Yup.boolean(),
  thu: Yup.boolean(),
  tue: Yup.boolean(),
  wed: Yup.boolean(),
  fulltime: Yup.boolean().required('Please Select at least one').nullable(),
  pottyBreak: Yup.string().required('pottyBreak must be selected'),
});
