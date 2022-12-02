import * as Yup from 'yup';

export const CreditAndDebitCardSchema = Yup.object().shape({
  name: Yup.string().required('Card Name required'),
  cardInfo: Yup.string().required('Card field incomplete'),
  line1: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  // postalCode: Yup.number()
  //   .nullable()
  //   .typeError('A Number is Required')
  //   .required('Postal code is required')
  //   .label('Postal code'),
  //  postal_code: Yup.string()
  // .length(5)
  // .matches(/^[0-9]{5}/)
  // .required()
  // .label('Kode Pos'),
});
