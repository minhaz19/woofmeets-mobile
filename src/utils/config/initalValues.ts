import {
  forgotPasswordOtpType,
  forgotPasswordType,
  LoginType,
  SetPasswordType,
  SignUpType,
  verifyAccountType,
  addPetType,
  filterProviderType,
  BoardingSettingsType,
} from './types';

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
  oldPass: '',
  newPass: '',
  confirmPass: '',
};
const forgotPasswordValue: forgotPasswordType = {email: ''};
const forgotPasswordOtpValue: forgotPasswordOtpType = {code: ''};
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

const BoardingSettings: BoardingSettingsType = {
  payPerService: '27',
  holiDayRate: '0',
  additionalDogRate: '0',
  puppyRate: '0',
  catRate: '0',
  additionalCat: '0',
  extendedStayRate: '0',
  bathingGrooming: '0',
  pickUpDropOff: '0',
  homeFullTimeInWeek: '',
  selectDay: [],
  homeFullTimeInDay: '',
  advancedNotice: '',
  homeType: '',
  yardType: '',
  petOwnerBoarding: [],
  hosting: [],
  cancellationPolicy: '',
  petPreference: [],
};

export {
  loginValue,
  signupValue,
  setPasswordValue,
  forgotPasswordValue,
  forgotPasswordOtpValue,
  verifyAccountValue,
  addPetValue,
  filterProviderValue,
  BoardingSettings,
};
