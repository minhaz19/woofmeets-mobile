import {
  forgotPasswordOtpType,
  forgotPasswordType,
  LoginType,
  SetPasswordType,
  SignUpType,
  verifyAccountType,
  addPetType,
  filterProviderType,
  forgotPasswordResetType,
} from '../Types/types';

const loginValue: LoginType = {email: '', password: ''};
const signupValue: SignUpType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  zipcode: null,
  terms: false,
};
const setPasswordValue: SetPasswordType = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const forgotPasswordReset: forgotPasswordResetType = {
  newPassword: '',
  confirmPassword: '',
};
const forgotPasswordValue: forgotPasswordType = {email: ''};
const otpValue: forgotPasswordOtpType = {code: ''};
const verifyAccountValue: verifyAccountType = {code: ''};
const addPetValue: addPetType = {
  petImage: '',
  petType: '',
  petName: '',
  weight: null,
  ageYr: null,
  ageMo: null,
  gender: '',
  breeds: '',
  microchipped: '',
  houseTrained: '',
  spayedNeutered: '',
  friendlyChildren: '',
  friendlyDogs: '',
  friendlyCats: '',
  petDescription: '',
  pottyBreak: '',
  feedingSchedule: '',
  energyLevel: '',
  leftAlone: '',
  additionalDescription: '',
  medication: '',
  pillMedicaion: '',
  topicalMedication: '',
  injectionMedication: '',
  additionalInfo: '',
  petInfo: '',
  photoGallery: [],
};
const filterProviderValue: filterProviderType = {
  location: '',
  dateRange: '',
  petType: '',
  priceRange: [],
  homeType: '',
};
const backgroundCheckInit = {
  dob: '',
  state: '',
  dlld: '',
  stateId: '',
  imageGallery: [],
};
const planCheckoutInit = {
  email: '',
  phone: '',
  cardInfo: {
    country: '',
    postalCode: '',
  },
};
const appointmentInit = {
  providerServiceId: null,
  serviceTypeId: 1,
  visitLength: 30,
  isRecurring: false,
  dropOffStartTime: '',
  dropOffEndTime: '',
  pickUpStartTime: '',
  pickUpEndTime: '',
  recurringStartDate: '',
  recurringSelectedDay: [],
  selectedDays: [],
  repeatDate: [],
  proposalStartDate: '',
  proposalEndDate: '',
  proposalOtherDate: [],
  petsId: [],
  firstMessage: '',
  recurringModDates: [],
  specificModDates: [],
  recurringModDatesRef: [],
  specificModDatesRef: [],
  multiDate: [],
  selectedRange: [],
  selectDate: [],
  isRecivedPhotos: false,
};
const profileSetupInit = {
  profileImage: '',
  dob: '',
  addressLine1: '',
  addressLine2: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  countryId: '',
  latitude: 0,
  longitude: 0,

  emergencyContactName: '',
  emergencyPhone: '',
  // name: '',
  // email: '',
  // phone: '',
  numberVerified: false,

  headline: '',
  yearsOfExperience: '0',
  experienceDescription: '',
  skills: [],
};
export {
  loginValue,
  signupValue,
  setPasswordValue,
  forgotPasswordValue,
  otpValue,
  verifyAccountValue,
  addPetValue,
  filterProviderValue,
  forgotPasswordReset,
  backgroundCheckInit,
  planCheckoutInit,
  appointmentInit,
  profileSetupInit,
};
