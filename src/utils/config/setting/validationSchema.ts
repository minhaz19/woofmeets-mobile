import * as Yup from 'yup';
import { phoneNumberReg, emailReg } from '../../../constants/regex';

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
  emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
  email: Yup.string().required('Email is required').matches(emailReg, 'Please Input a valid E-mail address'),
  emergencyPhone: Yup.string().matches(phoneNumberReg, 'Please input a valid phone number').required('Phone Number is required'),
});

export {basicInfoValidationSchema, contactValidationSchema};
