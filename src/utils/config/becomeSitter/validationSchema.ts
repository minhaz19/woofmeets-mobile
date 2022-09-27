import * as Yup from 'yup';

const sitterDetailsValidationSchema = Yup.object().shape({
  headline: Yup.string().required('This field is required'),
  yearsOfExperience: Yup.string().required('This field is required'),
  // dogsExperience: Yup.string(),
  // walkingExperience: Yup.string(),
  // requestedDogInfo: Yup.string(),
  experienceDescription: Yup.string().required('This field is required'),
  environmentDescription: Yup.string().required('This field is required'),
  scheduleDescription: Yup.string().required('This field is required'),
});

export {sitterDetailsValidationSchema};
