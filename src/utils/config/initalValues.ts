import {
  forgotPasswordOtpType,
  forgotPasswordType,
  LoginType,
  SetPasswordType,
  SignUpType,
  verifyAccountType,
  addPetType,
} from './types';

const loginValue: LoginType = {email: '', password: ''};
const signupValue: SignUpType = {email: '', password: '', terms: false};
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

export {
  loginValue,
  signupValue,
  setPasswordValue,
  forgotPasswordValue,
  forgotPasswordOtpValue,
  verifyAccountValue,
  addPetValue,
};
