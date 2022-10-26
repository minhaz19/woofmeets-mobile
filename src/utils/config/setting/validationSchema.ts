import {parse} from 'date-fns';
import * as Yup from 'yup';
import {  emailReg, phoneNumberReg1 } from '../../../constants/regex';

const basicInfoValidationSchema = Yup.object().shape({
  profileImage: Yup.string(),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  street: Yup.string(),
  zipCode: Yup.string().required('Zip code is required'),
  countryId: Yup.number(),
  name: Yup.string().required('Name is required'),
  dob: Yup.date()
    .typeError('please enter a valid date')
    .required()
});

const contactValidationSchema = Yup.object().shape({
  emergencyContactName: Yup.string(),
  email: Yup.string(),
  emergencyPhone: Yup.string(),
});

export {basicInfoValidationSchema, contactValidationSchema};
