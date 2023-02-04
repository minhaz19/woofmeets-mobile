import * as Yup from 'yup';

const sitterDetailsValidationSchema = Yup.object().shape({
  headline: Yup.string().required('This field is required'),
  yearsOfExperience: Yup.number()
    .min(0, 'Please enter a positive number')
    .required('Please input a number')
    .typeError('Years of experience must be number')
    .nullable(),
  // dogsExperience: Yup.string(),
  // walkingExperience: Yup.string(),
  // requestedDogInfo: Yup.string(),
  experienceDescription: Yup.string().required('This field is required'),
  // environmentDescription: Yup.string().required('This field is required'),
  // scheduleDescription: Yup.string().required('This field is required'),
  // about: Yup.string().required('This field is required'),
  // skills:
  skills: Yup.array(),
  smallDog: Yup.boolean(),
  mediumDog: Yup.boolean(),
  largeDog: Yup.boolean(),
  giantDog: Yup.boolean(),
  cat: Yup.boolean(),
  petPerDay: Yup.number(),
  homeType: Yup.string(),
  yardType: Yup.string(),
  ownerAttributes: Yup.array(),
  hostAttributes: Yup.array(),
});

export {sitterDetailsValidationSchema};
