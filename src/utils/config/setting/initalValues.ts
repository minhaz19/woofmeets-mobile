import {basicInfoType, contactType} from './types';

const basicInfoValue: basicInfoType = {
  profileImage: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  countryId: 1,
  name: '',
  dob: '',
};

const contactValues: contactType = {
  phone: '',
  emergencyContactName: '',
  email: '',
  emergencyContactPhone: '',
};

export {basicInfoValue, contactValues};
