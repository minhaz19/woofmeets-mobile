import * as Yup from 'yup';

export const AvailabilityInitialValues = (
  serviceAvailabilityId: number,
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
  };
};

// const daySchema = Yup.object().shape(
//   {
//     fri: Yup.bool().when(['sat', 'sun', 'mon', 'thu', 'tue', 'wed'], {
//       is: (sat, sun, mon, thu, tue, wed) =>
//         !sat && !sun && !mon && !thu && !tue && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     sat: Yup.bool().when(['fri', 'sun', 'mon', 'thu', 'tue', 'wed'], {
//       is: (fri, sun, mon, thu, tue, wed) =>
//         !fri && !sun && !mon && !thu && !tue && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     sun: Yup.bool().when(['fri', 'sat', 'mon', 'thu', 'tue', 'wed'], {
//       is: (fri, sat, mon, thu, tue, wed) =>
//         !fri && !sat && !mon && !thu && !tue && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     mon: Yup.bool().when(['fri', 'sun', 'sat', 'thu', 'tue', 'wed'], {
//       is: (fri, sun, sat, thu, tue, wed) =>
//         !fri && !sun && !sat && !thu && !tue && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     thu: Yup.bool().when(['fri', 'sun', 'mon', 'sat', 'tue', 'wed'], {
//       is: (fri, sun, mon, sat, tue, wed) =>
//         !fri && !sun && !mon && !sat && !tue && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     tue: Yup.bool().when(['fri', 'sun', 'mon', 'thu', 'sat', 'wed'], {
//       is: (fri, sun, mon, thu, sat, wed) =>
//         !fri && !sun && !mon && !thu && !sat && !wed,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//     wed: Yup.bool().when(['fri', 'sun', 'mon', 'thu', 'tue', 'sat'], {
//       is: (fri, sun, mon, thu, tue, sat) =>
//         !fri && !sun && !mon && !thu && !tue && !sat,
//       then: Yup.bool().oneOf([true], 'At least one needs to be checked'),
//     }),
//   },
//   [
//     ['fri', 'sat'],
//     ['fri', 'sun'],
//     ['fri', 'mon'],
//     ['fri', 'thu'],
//     ['fri', 'tue'],
//     ['fri', 'wed'],
//     ['sat', 'sun'],
//     ['sat', 'mon'],
//     ['sat', 'thu'],
//     ['sat', 'wed'],
//     ['sat', 'tue'],
//     ['sun', 'mon'],
//     ['sun', 'thu'],
//     ['sun', 'wed'],
//     ['sun', 'tue'],
//     ['mon', 'tue'],
//     ['mon', 'wed'],
//     ['mon', 'thu'],
//     ['tue', 'thu'],
//     ['tue', 'wed'],
//     ['wed', 'thu'],
//   ],
// );

export const availabilityValidation = Yup.object().shape({
  fri: Yup.boolean(),
  mon: Yup.boolean(),
  sat: Yup.boolean(),
  sun: Yup.boolean(),
  thu: Yup.boolean(),
  tue: Yup.boolean(),
  wed: Yup.boolean(),
  fulltime: Yup.boolean().required('Please Select at least one').nullable(),
  pottyBreak: Yup.string().required('Potty Break must be selected'),
});
