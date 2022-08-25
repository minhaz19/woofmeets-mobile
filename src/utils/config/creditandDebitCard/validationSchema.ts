import * as Yup from 'yup';

export const CreditAndDebitCardSchema = Yup.object().shape({
  cardName: Yup.string().required('Card Name required'),
  cardNumber: Yup.string().required('Card Number required'),
  expiration: Yup.string().required('Card expiration date required'),
  cvc: Yup.string().required('CVC required'),
  country: Yup.string().required('Country Name required'),
  addressLine1: Yup.string().required('addressLine1 required'),
  aptState: Yup.string(),
  city: Yup.string().required('City Name required'),
  stateOrProvince: Yup.string().required('State or Province Name required'),
  zip: Yup.string().required('Zip/Postal code required'),
});
