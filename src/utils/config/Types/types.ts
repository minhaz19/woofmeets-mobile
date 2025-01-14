export interface LoginType {
  email: string;
  password: string;
}
export interface SignUpType {
  firstName: string;
  lastName: string;
  zipcode: null | number;
  email: string;
  password: string;
  terms: boolean;
}
export interface SetPasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface forgotPasswordResetType {
  newPassword: string;
  confirmPassword: string;
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
  weight: number | null;
  ageYr: number | null;
  ageMo: number | null;
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
  photoGallery: [];
}
export interface filterProviderType {
  location: string;
  dateRange: string;
  petType: string;
  priceRange: [];
  homeType: string;
}
