import * as Yup from 'yup';

export const AvailabilityInitialValues = (
  availability: any,
  itemId: any,
) => {
  const dates = availability !== null && availability;
  const methods = availability !== null && availability?.service;
  return {
    providerServiceId: itemId,
    fri: dates?.fri ? dates?.fri : false,
    mon: dates?.mon ? dates?.mon : false,
    sat: dates?.sat ? dates?.sat : false,
    sun: dates?.sun ? dates?.sun : false,
    thu: dates?.thu ? dates?.thu : false,
    tue: dates?.tue ? dates?.tue : false,
    wed: dates?.wed ? dates?.wed : false,
    fulltime: methods?.fulltime ? methods?.fulltime : false,
    pottyBreak: methods?.pottyBreak ? methods?.pottyBreak : '',
    // selectedDays: [
    //   {fri: dates?.fri ? dates?.fri : false},
    //   {mon: dates?.mon ? dates?.mon : false},
    //   {sat: dates?.sat ? dates?.sat : false},
    //   ,
    //   {sun: dates?.sun ? dates?.sun : false},
    //   {thu: dates?.thu ? dates?.thu : false},
    //   {tue: dates?.tue ? dates?.tue : false},
    //   {wed: dates?.wed ? dates?.wed : false},
    // ],
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
  // fulltime: Yup.boolean().required('Please Select at least one').nullable(),
  pottyBreak: Yup.string().required('Potty Break must be selected'),
});
