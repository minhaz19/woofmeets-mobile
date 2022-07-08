export interface LoginType {
  email: string;
  password: string;
}
export interface SignUpType {
  email: string;
  password: string;
  terms: boolean;
}
export interface SetPasswordType {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}
export interface forgotPasswordType {
  email: string;
}
export interface forgotPasswordOtpType {
  code: string;
}
export interface verifyAccountType {
  code: string;
}
export interface addPetType {
  petImage: string;
  petType: string;
  petName: string;
  weight: string;
  ageYr: string;
  ageMo: string;
  gender: string;
  breeds: string;
  microchipped: string;
  houseTrained: string;
  spayedNeutered: string;
  friendlyChildren: string;
  friendlyDogs: string;
  friendlyCats: string;
  petDescription: string;
  pottyBreak: string;
  feedingSchedule: string;
  energyLevel: string;
  leftAlone: string;
  additionalDescription: string;
  medication: string;
  pillMedicaion: string;
  topicalMedication: string;
  injectionMedication: string;
  additionalInfo: string;
  petInfo: string;
  photoGallery: string;
}
