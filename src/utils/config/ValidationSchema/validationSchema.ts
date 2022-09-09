import * as Yup from 'yup';

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
  oldPassword: Yup.string().required().min(8).label('Old Password'),
  newPassword: Yup.string()
    .required('No password provided.')
    .min(8, 'Too short - should be min 8 character.')
    .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
  confirmPassword: Yup.string()
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Password does not match'),
});
const forgotPasswordResetValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('No password provided.')
    .min(8, 'Too short - should be min 8 character.')
    .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
  confirmPassword: Yup.string()
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Password does not match'),
});

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const otpValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(6).max(6).label('OTP'),
});
const verifyAccountValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(6).max(6).label('OTP'),
});
const addPetValidationSchema = Yup.object().shape({
  profile_image: Yup.string().required('Image is required'),
  type: Yup.string().required('Pet type is required'),
  name: Yup.string().required('Pet name is required'),
  weight: Yup.number()
    .nullable(true)
    .positive()
    .integer()
    .required('Pet weight is required')
    .typeError('A Number is Required'),
  ageYear: Yup.number()
    .nullable(true)
    .positive()
    .integer()
    .required('Year Required')
    .typeError('A Number is Required'),
  ageMonth: Yup.number()
    .nullable(true)
    .positive()
    .integer()
    .required('Month Required')
    .typeError('A Number is Required'),
  gender: Yup.string().required('Please select a gender'),

  breeds: Yup.array()
    .min(1, 'Pick at least one breed')
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
      }),
    ),

  microchipped: Yup.boolean().nullable(true),
  houseTrained: Yup.string(),
  houseTrainedAdditionalDetails: Yup.string(),
  spayedOrNeutered: Yup.boolean().nullable(true),
  childFriendly: Yup.string(),
  childFrinedlyAdditionalDetails: Yup.string(),
  dogFriendly: Yup.string(),
  dogFrinedlyAdditionalDetails: Yup.string(),
  catFriendly: Yup.string(),
  catFrinedlyAdditionalDetails: Yup.string(),
  about: Yup.string(),
  pottyBreakSchedule: Yup.string(),
  pottyBreakScheduleDetails: Yup.string(),
  feedingSchedule: Yup.string(),
  feedingScheduleDetails: Yup.string(),
  energyLevel: Yup.string(),
  canLeftAlone: Yup.string(),
  canLeftAloneDetails: Yup.string(),
  additionalDescription: Yup.string(),
  pill: Yup.boolean(),
  topical: Yup.boolean(),
  injection: Yup.boolean(),
  pillMedication: Yup.string(),
  topicalMedication: Yup.string(),
  injectionMedication: Yup.string(),
  sitterInstructions: Yup.string(),
  vetInfo: Yup.string(),
  gallery: Yup.array(),
  // caption: Yup.string(),
});
const filterProviderValidationSchema = Yup.object().shape({
  priceRange: Yup.array(),
  homeType: Yup.string(),
  location: Yup.string(),
  petType: Yup.string(),
  dateRange: Yup.string(),
  // dateRange: Yup.array(),
});
const providerAvailablityValidationSchema = Yup.object().shape({
  dateRange: Yup.array(),
});

const BoardingSettingsSchema = Yup.object().shape({
  baserate: Yup.number()
    .nullable(true)
    .required('Pet per service is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  sixtyMinRate: Yup.number()
    .nullable(true)
    // .required('holiday rate is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  holidayrate: Yup.number()
    .nullable(true)
    .required('holiday rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  additionaldog: Yup.number()
    .nullable(true)
    .required('Additional dog rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  puppyRate: Yup.number()
    .nullable(true)
    // .required('Puppy rate is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  catcare: Yup.number()
    .nullable(true)
    .required('Cate rate is required')
    .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  additionalCat: Yup.number()
    .nullable(true)
    // .required('Additional cat rate is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  extendedStayRate: Yup.number()
    .nullable(true)
    // .required('Extended stay rate is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  bathingGrooming: Yup.number()
    .nullable(true)
    // .required('Bathing grooming is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
  pickUpDropOff: Yup.number()
    .nullable(true)
    // .required('Pick up drop off is required')
    // .typeError('A Number is Required')
    .max(150, 'Please enter a value less than or equal to 150.'),
});
const safetyQuizValidationSchema = Yup.object().shape({
  quiz_one: Yup.string(),
  quiz_two: Yup.string(),
  quiz_three: Yup.string(),
  quiz_four: Yup.string(),
  quiz_five: Yup.string(),
});

export {
  loginValidationSchema,
  signUpValidationSchema,
  setPasswordValidationSchema,
  forgotPasswordValidationSchema,
  otpValidationSchema,
  verifyAccountValidationSchema,
  addPetValidationSchema,
  filterProviderValidationSchema,
  BoardingSettingsSchema,
  forgotPasswordResetValidationSchema,
  providerAvailablityValidationSchema,
  safetyQuizValidationSchema,
};