import * as Yup from 'yup';

const basicInfoValidationSchema = Yup.object().shape({
  profileImage: Yup.string(),
  addressLine1: Yup.string(),
  addressLine2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  street: Yup.string(),
  zipCode: Yup.string(),
  countryId: Yup.number(),
  name: Yup.string(),
  dob: Yup.string(),
});

const contactValidationSchema = Yup.object().shape({
  phone: Yup.string().required('Please add at least one phone number'),
  emergencyContactName: Yup.string(),
  email: Yup.string(),
  emergencyContactPhone: Yup.string(),
});

export {basicInfoValidationSchema, contactValidationSchema};
