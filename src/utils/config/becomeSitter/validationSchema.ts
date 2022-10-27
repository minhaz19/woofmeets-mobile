import * as Yup from 'yup';

const sitterDetailsValidationSchema = Yup.object().shape({
  headline: Yup.string().required('This field is required'),
  yearsOfExperience: Yup.number().required('Please input a number'),
  // dogsExperience: Yup.string(),
  // walkingExperience: Yup.string(),
  // requestedDogInfo: Yup.string(),
  experienceDescription: Yup.string().required('This field is required'),
  environmentDescription: Yup.string().required('This field is required'),
  scheduleDescription: Yup.string().required('This field is required'),
  // about: Yup.string().required('This field is required'),
  // skills: 
});

export {sitterDetailsValidationSchema};
