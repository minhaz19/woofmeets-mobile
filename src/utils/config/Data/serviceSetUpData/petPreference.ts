export const petType = {
  title: 'What type of pets can you host in your home?',
  subtitle: '( Check all that apply )',
  name: 'petType',
  id: 1,
  square: true,
  radio: false,
  options: [
    {id: 36, type: 'Small dog ( 0-15 Ibs )', name: 'smallDog', value: null},
    {id: 37, type: 'Medium dog ( 0-15 Ibs )', name: 'mediumDog', value: null},
    {id: 38, type: 'Large dog ( 0-15 Ibs )', name: 'largeDog', value: null},
    {id: 39, type: 'Giant dog ( 0-15 Ibs )', name: 'giantDog', value: null},
    {id: 40, type: 'Cat', name: 'cat', value: null},
  ],
};
export const puppies = {
  title: 'Do you accept puppies under 1 year old?',
  name: 'puppies',
  id: 2,
  square: false,
  radio: true,
  flex: 0.5,
  options: [
    {id: 5, type: 'Yes', checked: false},
    {id: 6, type: 'No', checked: false},
  ],
  houseSitting: true,
  dropIn: true,
  dogWalking: true,
};

export const petsQuantity = {
  boarding: true,
  dayCare: true,
};
