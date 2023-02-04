import * as Yup from 'yup';

const basicInfoValidationSchema = Yup.object().shape({
  profileImage: Yup.string(),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  street: Yup.string(),
  zipCode: Yup.string().required('Zip code is required'),
  countryId: Yup.string().required('Country name is required'),
  name: Yup.string().required('Name is required'),
  dob: Yup.date()
    .typeError('Please enter a valid date')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      'You must be at least 18 years old',
    )
    .required('Date of Birth is required'),
  // latitude: Yup.number().required('Address is required'),
  // longitude: Yup.number().required('Address is required'),
});

const contactValidationSchema = Yup.object().shape({
  emergencyContactName: Yup.string(),
  emergencyPhone: Yup.string(),
});

export {basicInfoValidationSchema, contactValidationSchema};
