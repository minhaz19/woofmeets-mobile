import * as Yup from 'yup';

const sitterDetailsValidationSchema = Yup.object().shape({
  headline: Yup.string().required('This field is required'),
  yearsOfExperience: Yup.number().min(0).required('Please input a number'),
  // dogsExperience: Yup.string(),
  // walkingExperience: Yup.string(),
  // requestedDogInfo: Yup.string(),
  experienceDescription: Yup.string().required('This field is required'),
  environmentDescription: Yup.string().required('This field is required'),
  scheduleDescription: Yup.string().required('This field is required'),
  about: Yup.string().required('This field is required'),
  // skills:
  oral_medication: Yup.boolean(),
  daily_exercise: Yup.boolean(),
  first_aid_cpr: Yup.boolean(),
  senior_pet_experience: Yup.boolean(),
  injected_medication: Yup.boolean(),
  skills: Yup.array(),
});

export {sitterDetailsValidationSchema};
