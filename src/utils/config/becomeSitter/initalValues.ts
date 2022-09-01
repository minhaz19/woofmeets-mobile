import {basicInfoType, contactDetailsType, contactType} from './types';

const basicInfoValue: basicInfoType = {
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  state: '',
  street: '',
  postalCode: '',
  name: '',
  emailAddress: '',
  dob: '',
  newPassword: '',
};

const contactValues: contactType = {
  phone: '',
  emergencyContactName: '',
  email: '',
  emergencyPhone: '',
};

const sitterDetailsValue: contactDetailsType = {
  headline: '',
  yearsOfExperience: 0,
  // dogsExperience: '',
  // walkingExperience: '',
  // requestedDogInfo: '',
  experienceDescription: '',
  environmentDescription: '',
  scheduleDescription: '',
}

export {basicInfoValue, contactValues, sitterDetailsValue};
