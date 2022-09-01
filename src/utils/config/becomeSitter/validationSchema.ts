import * as Yup from 'yup';

const basicInfoValidationSchema = Yup.object().shape({
  addressLineOne: Yup.string().required('Address Line 1 is required'),
  addressLineTwo: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  country: Yup.string().required('Country is required'),
  name: Yup.string().required('Name is required'),
  emailAddress: Yup.string()
    .required('Email Address is required')
    .email()
    .label('Email'),
  dob: Yup.string(),
  newPassword: Yup.string().min(8).label('Password'),
});

const contactValidationSchema = Yup.object().shape({
  phone: Yup.string().required('Please add at least one phone number'),
  emergencyContactName: Yup.string(),
  email: Yup.string(),
  emergencyPhone: Yup.string(),
});

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

export {basicInfoValidationSchema, contactValidationSchema, sitterDetailsValidationSchema};
