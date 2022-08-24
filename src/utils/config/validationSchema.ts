import * as Yup from 'yup';
import {genders} from './Data/AddPetData';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .min(2)
    .max(40)
    .required()
    .label('First Name'),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .min(2)
    .max(40)
    .required()
    .label('Last Name'),
  zipcode: Yup.string()
    .required('Zipcode is required')
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Invalid Zipcode')
    .nullable()
    .label('Zip Code'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Too short - should be min 8 character.')
    .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
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
  photoGallery: Yup.array()
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

const BoardingSettingsSchema = Yup.object().shape({
  payPerService: Yup.number()
    .nullable(true)
    .required('Pet per service is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  holiDayRate: Yup.number()
    .nullable(true)
    .required('holiday rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  additionalDogRate: Yup.number()
    .nullable(true)
    .required('Additional dog rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  puppyRate: Yup.number()
    .nullable(true)
    .required('Puppy rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  catRate: Yup.number()
    .nullable(true)
    .required('Cate rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  additionalCat: Yup.number()
    .nullable(true)
    .required('Additional cat rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  extendedStayRate: Yup.number()
    .nullable(true)
    .required('Extended stay rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  bathingGrooming: Yup.number()
    .nullable(true)
    .required('Bathing grooming is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  pickUpDropOff: Yup.number()
    .nullable(true)
    .required('Pick up drop off is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  homeFullTimeInWeek: Yup.boolean().oneOf([true], 'This field must be checked'),
  selectDay: Yup.array().required('Please Select at least one'),
  homeFullTimeInDay: Yup.string().required('Please Select at least one'),
  advancedNotice: Yup.string().required('Please Select at least one'),
  homeType: Yup.string().required('Please Select at least one'),
  yardType: Yup.string().required('Please Select at least one'),
  petOwnerBoarding: Yup.string().required('Please Select at least one'),
  hosting: Yup.string().required('Please Select at least one'),
  cancellationPolicy: Yup.string().required('Please Select at least one'),
  petPreference: Yup.string().required('Please Select at least one'),
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
  BoardingSettingsSchema,
};
