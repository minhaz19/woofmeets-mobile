import {basicInfoType, contactType} from './types';

const basicInfoValue: basicInfoType = {
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
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

export {basicInfoValue, contactValues};
