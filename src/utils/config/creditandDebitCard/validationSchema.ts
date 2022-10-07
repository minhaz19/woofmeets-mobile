import * as Yup from 'yup';

export const CreditAndDebitCardSchema = Yup.object().shape({
  name: Yup.string().required('Card Name required'),
  cardInfo: Yup.string().required('Card field invalid'),
  // cardInfo: Yup.object().shape({
  //   last4: Yup.string().required('Card info is required'),
  //   expiryMonth: Yup.string().required('Card info is required'),
  //   expiryYear: Yup.string().required('Card info is required'),
  //   country: Yup.string().required('Card info is required'),
  //   postalCode: Yup.string().required('Card info is required'),
  // }),
  line1: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('city is required'),
  postalCode: Yup.string().required('Card info is required'),
});
