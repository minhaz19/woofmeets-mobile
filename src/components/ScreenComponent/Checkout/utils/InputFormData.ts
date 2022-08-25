export const InputFormData = [
  {
    title: 'Name on Card',
    placeholder: 'Card name',
    name: 'cardName',
  },
  {
    title: 'Card Number',
    placeholder: 'Card Number',
    name: 'cardNumber',
  },
  {
    title: 'Expiration',
    placeholder: 'MM/YY',
    name: 'expiration',
    flex: 0.5,
  },
  {
    title: 'CVC',
    placeholder: 'CVC',
    name: 'cvc',
    flex: 0.5,
  },
  {
    title: 'Country',
    placeholder: 'Country',
    name: 'country',
    select: true,
    data: [],
  },
  {
    title: 'Address Line 1',
    placeholder: 'Address Line 1',
    name: 'addressLine1',
  },
  {
    title: 'Apt, Ste , Bidg (optional)',
    placeholder: 'USA',
    name: 'aptState',
  },
  {
    title: 'City',
    placeholder: 'City',
    name: 'city',
  },
  {
    title: 'State or Province',
    placeholder: 'State or Province',
    name: 'stateOrProvince',
  },
  {
    title: 'ZIP/postal/ Postcode',
    placeholder: 'ZIP/postal/ Postcode',
    name: 'zip',
  },
];

export const CountryData = [
  'USA',
  'Canada',
  'Australia',
  'Mexico',
  'Britain',
  'Ireland',
];
