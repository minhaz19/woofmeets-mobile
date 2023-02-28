import * as Yup from 'yup';
export const serviceSetupValidationSchema = Yup.object().shape({
  baserate: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Base rate must be a positive number or zero')
    .required('Pet per service is required')
    .typeError('A Number is Required'),
  holidayrate: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Holiday rate must be a positive number or zero')
    .required('holiday rate is required')
    .typeError('A Number is Required'),
  additionaldog: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Additional dog rate must be a positive number or zero')
    .required('Additional dog rate is required')
    .typeError('A Number is Required'),
  catcare: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Cat rate must be a positive number or zero')
    .required('Cate rate is required')
    .typeError('A Number is Required'),
  puppyrate: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Puppy rate must be a positive number or zero')
    .required('Puppy rate rate is required')
    .typeError('A Number is Required'),
  additionalcat: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Additional cat rate must be a positive number or zero')
    .required('Additional cat rate is required')
    .typeError('A Number is Required'),
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
  cancellationPolicy: Yup.string()
    .required('Cancellation policy must be selected')
    .nullable(),
  preference: Yup.object()
    .shape({
      smallDog: Yup.boolean(),
      mediumDog: Yup.boolean(),
      largeDog: Yup.boolean(),
      giantDog: Yup.boolean(),
      cat: Yup.boolean(),
    }),
    // .test(
    //   'at-least-one-pet-selected',
    //   'At least one pet must be selected',
    //   value => {
    //     return Object.values(value).some(preference => preference === true);
    //   },
    // ),
  petPerDay: Yup.number()
    .nullable(true)
    .positive()
    .min(0, 'Pet per day must be a positive number or zero')
    // .required('Pet per day is required')
    .typeError('A Number is Required'),
  homeType: Yup.string(),
  yardType: Yup.string(),
  homeAttributes: Yup.array().nullable(),
});
