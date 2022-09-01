export interface basicInfoType {
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
  name: string;
  emailAddress: string;
  dob: string;
  newPassword: string;
}

export interface contactType {
  phone: string;
  emergencyContactName: string;
  email: string;
  emergencyPhone: string;
}

export interface contactDetailsType {
  headline: string;
  yearsOfExperience: number;
  // dogsExperience: string;
  // walkingExperience: string;
  // requestedDogInfo: string;
  experienceDescription: string;
  environmentDescription: string;
  scheduleDescription: string;
}
