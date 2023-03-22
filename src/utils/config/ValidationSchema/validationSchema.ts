import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
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
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Too short - should be min 6 character.'),
  // .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
  terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

const setPasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required().min(6).label('Old Password'),
  newPassword: Yup.string()
    .required('No password provided.')
    .min(6, 'Too short - should be min 6 character.'),
  // .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
  confirmPassword: Yup.string()
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Password does not match'),
});
const forgotPasswordResetValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('No password provided.')
    .min(6, 'Too short - should be min 6 character.'),
  // .matches(/[a-zA-Z]/, 'Provide letters and numbers.'),
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
const addPetHomeValidationSchema = Yup.object().shape({
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
    .min(0)
    .required('Year Required')
    .typeError('A Number is Required'),
  ageMonth: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
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
});
const addPetCheckValidationSchema = Yup.object().shape({
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
});
const addPetSubmitValidationSchema = Yup.object().shape({
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
    .positive()
    .min(0)
    .required('Pet per service is required')
    .typeError('A Number is Required'),
  holidayrate: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
    .required('holiday rate is required')
    .typeError('A Number is Required'),
  additionaldog: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
    .required('Additional dog rate is required')
    .typeError('A Number is Required'),
  catcare: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
    .required('Cate rate is required')
    .typeError('A Number is Required'),
  puppyrate: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
    .required('Puppy rate rate is required')
    .typeError('A Number is Required'),
  additionalcat: Yup.number()
    .nullable(true)
    .positive()
    .min(0)
    .required('Additional cat rate is required')
    .typeError('A Number is Required'),
  // bathgroomingrate: Yup.number()
  //   .nullable(true)
  //   .required('Bathgrooming rate is required')
  //   .typeError('A Number is Required'),
  // extendedCare: Yup.number()
  //   .nullable(true)
  //   .required('Extended care rate is required')
  //   .typeError('A Number is Required'),
  // costadjustment: Yup.number()
  //   .nullable(true)
  //   .required('Cost adjustment rate is required')
  //   .typeError('A Number is Required'),
  // discountadjustment: Yup.number()
  //   .nullable(true)
  //   .required('Discount adjustment rate is required')
  //   .typeError('A Number is Required'),
  // extendedstayrate: Yup.number()
  //   .nullable(true)
  //   .required('Extendedstay rate is required')
  //   .typeError('A Number is Required'),
});
const safetyQuizValidationSchema = Yup.object().shape({
  '1': Yup.string().required('Please choose the corrent answer'),
  '2': Yup.string().required('Please choose the corrent answer'),
  '3': Yup.string().required('Please choose the corrent answer'),
  '4': Yup.string().required('Please choose the corrent answer'),
  '5': Yup.string().required('Please choose the corrent answer'),
  '6': Yup.string().required('Please choose the corrent answer'),
  '7': Yup.string().required('Please choose the corrent answer'),
});
const backgroundCheckValidationSchema = Yup.object().shape({
  dob: Yup.string(),
  // dob: Yup.string().required('Please provide date of birth'),
  state: Yup.string(),
  dlld: Yup.string(),
  stateId: Yup.string(),
  imageGallery: Yup.array(),
});
const planCheckoutValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is a required field'),
  phone: Yup.string().required('Provide your number'),
  cardInfo: Yup.object().shape({
    country: Yup.string().required('country is required'),
    postalCode: Yup.string().required('postalCode is required'),
  }),
});

const cardExpValidationSchema = Yup.object().shape({
  month: Yup.number().required('Month is required'),
  year: Yup.number().required('Year is required'),
});

const appointmentValidationSchema = Yup.object().shape({
  providerServiceId: Yup.number()
    .nullable(true)
    .typeError('A Number is Required'),
  serviceTypeId: Yup.number().nullable(true).typeError('A Number is Required'),
  visitLength: Yup.number().nullable(true).typeError('A Number is Required'),
  isRecurring: Yup.boolean(),
  dropOffStartTime: Yup.string(),
  dropOffEndTime: Yup.string(),
  pickUpStartTime: Yup.string(),
  pickUpEndTime: Yup.string(),
  petsId: Yup.array(),
  firstMessage: Yup.string(),
  isRecivedPhotos: Yup.boolean(),
  recurringStartDate: Yup.string(),
  recurringSelectedDay: Yup.array(),
  repeatDate: Yup.array(),
  proposalStartDate: Yup.string(),
  proposalEndDate: Yup.string(),
  proposalOtherDate: Yup.array(),
  recurringModDates: Yup.array(),
  specificModDates: Yup.array(),
  multiDate: Yup.array(),
  selectedRange: Yup.array(),
  selectDate: Yup.array(),
});
const appointmentModifyValidationSchema = Yup.object().shape({
  visitLength: Yup.number().nullable(true).typeError('A Number is Required'),
  isRecurring: Yup.boolean(),
  dropOffStartTime: Yup.string(),
  dropOffEndTime: Yup.string(),
  pickUpStartTime: Yup.string(),
  pickUpEndTime: Yup.string(),
  petsId: Yup.array(),
  recurringStartDate: Yup.string(),
  recurringSelectedDay: Yup.array(),
  repeatDate: Yup.array(),
  proposalStartDate: Yup.string(),
  proposalEndDate: Yup.string(),
  proposalOtherDate: Yup.array(),
  recurringModDates: Yup.array(),
  specificModDates: Yup.array(),
  multiDate: Yup.array(),
  selectedRange: Yup.array(),
  selectDate: Yup.array(),
  markedStyle: Yup.object(),
});
const profileSetupValidationSchema = Yup.object().shape({
  profileImage: Yup.string().nullable().required('Please upload your image'),
  dob: Yup.date()
    .typeError('Please enter a valid date')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      'You must be at least 18 years old',
    )
    .required('Date of Birth is required'),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  street: Yup.string(),
  zipCode: Yup.string().required('Zip code is required'),
  countryId: Yup.string().required('Country name is required'),
  numberVerified: Yup.boolean()
    .oneOf([true], 'Please verify phone number')
    .required('Please verify phone number'),
  emergencyContactName: Yup.string().nullable(),
  emergencyPhone: Yup.string().nullable(),
  headline: Yup.string().required('This field is required').max(70, 'Must be less than 70 characters'),
  yearsOfExperience: Yup.number()
    .min(0, 'Please enter a positive number')
    .test('len', 'Max 2 digits', val => val.toString().length <= 2)
    .required('Please input a number')
    .typeError('Years of experience must be number')
    .nullable(),

  experienceDescription: Yup.string()
    .required('This field is required')
    .min(400, 'At least 400 characters or more'),

  skills: Yup.array().min(1, 'Please select skills'),
});

export {
  loginValidationSchema,
  signUpValidationSchema,
  setPasswordValidationSchema,
  forgotPasswordValidationSchema,
  otpValidationSchema,
  verifyAccountValidationSchema,
  addPetHomeValidationSchema,
  addPetCheckValidationSchema,
  addPetSubmitValidationSchema,
  filterProviderValidationSchema,
  BoardingSettingsSchema,
  forgotPasswordResetValidationSchema,
  providerAvailablityValidationSchema,
  safetyQuizValidationSchema,
  backgroundCheckValidationSchema,
  planCheckoutValidationSchema,
  cardExpValidationSchema,
  appointmentValidationSchema,
  appointmentModifyValidationSchema,
  profileSetupValidationSchema,
};
