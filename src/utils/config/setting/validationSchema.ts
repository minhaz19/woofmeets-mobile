import {parse} from 'date-fns';
import * as Yup from 'yup';

const basicInfoValidationSchema = Yup.object().shape({
  profileImage: Yup.string(),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  street: Yup.string(),
  zipCode: Yup.string().required('Zip code is required'),
  countryId: Yup.number(),
  name: Yup.string().required('Name is required'),
  dob: Yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, 'dd/MM/yyyy', new Date());
      return result;
    })
    .typeError('please enter a valid date')
    .required()
    .min('1969-11-13', 'Date is too early'),
});

const contactValidationSchema = Yup.object().shape({
  phone: Yup.string().required('Please add at least one phone number'),
  emergencyContactName: Yup.string(),
  email: Yup.string(),
  emergencyContactPhone: Yup.string(),
});

export {basicInfoValidationSchema, contactValidationSchema};
