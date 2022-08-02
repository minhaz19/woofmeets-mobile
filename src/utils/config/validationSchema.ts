import * as Yup from 'yup';
import {genders} from './Data/AddPetData';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

const setPasswordValidationSchema = Yup.object().shape({
  oldPass: Yup.string().required().min(8).label('Old Password'),
  newPass: Yup.string().required().min(8).label('New Password'),
  confirmPass: Yup.string().required().min(8).label('Confirm Password'),
});

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const forgotPasswordOtpValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).max(4).label('Opt'),
});
const verifyAccountValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).max(4).label('Opt'),
});
const addPetValidationSchema = Yup.object().shape({
  petImage: Yup.string().required('Image is required'),
  petType: Yup.string().required('Pet type is required'),
  petName: Yup.string().required('Pet name is required'),
  weight: Yup.number()
    .nullable(true)
    .required('Pet weight is required')
    .typeError('A Number is Required'),
  ageYr: Yup.number()
    .nullable(true)
    .required('Year Required')
    .typeError('A Number is Required'),
  ageMo: Yup.number()
    .nullable(true)
    .required('Month Required')
    .typeError('A Number is Required'),
  gender: Yup.string().required('Please select a gender').oneOf(genders),
  breeds: Yup.string().required('Breed is required'),
  microchipped: Yup.string(),
  houseTrained: Yup.string(),
  spayedNeutered: Yup.string(),
  friendlyChildren: Yup.string(),
  friendlyDogs: Yup.string(),
  friendlyCats: Yup.string(),
  petDescription: Yup.string(),
  pottyBreak: Yup.string(),
  feedingSchedule: Yup.string(),
  energyLevel: Yup.string(),
  leftAlone: Yup.string(),
  additionalDescription: Yup.string(),
  medication: Yup.string(),
  pillMedicaion: Yup.string(),
  topicalMedication: Yup.string(),
  injectionMedication: Yup.string(),
  additionalInfo: Yup.string(),
  petInfo: Yup.string(),
  imageGallery: Yup.array()
    .required('This is required')
    .min(1, 'Please select at least one image'),
});
const filterProviderValidationSchema = Yup.object().shape({
  priceRange: Yup.array(),
  homeType: Yup.string(),
  location: Yup.string(),
  petType: Yup.string(),
  dateRange: Yup.string(),
  // dateRange: Yup.array(),
});

export {
  loginValidationSchema,
  signUpValidationSchema,
  setPasswordValidationSchema,
  forgotPasswordValidationSchema,
  forgotPasswordOtpValidationSchema,
  verifyAccountValidationSchema,
  addPetValidationSchema,
  filterProviderValidationSchema,
};
