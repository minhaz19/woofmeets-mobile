export const RatesInput = [
  {
    title: 'What you want clients to pay per service',
    placeholder: 'pay per service',
    name: 'payPerService',
  },
  {
    title: 'Holiday Rate',
    placeholder: 'Holiday Rate',
    name: 'holiDayRate',
  },
  {
    title: 'Additional dog Rate',
    placeholder: 'Additional dog Rate',
    name: 'additionalDogRate',
  },
  {
    title: 'Puppy Rate',
    placeholder: 'Puppy Rate',
    name: 'puppyRate',
  },
  {
    title: 'Cate Rate',
    placeholder: 'cate Rate',
    name: 'catRate',
  },
  {
    title: 'Additional Cat',
    placeholder: 'Additional Cat',
    name: 'additionalCat',
  },
  {
    title: 'Extended Stay Rate',
    placeholder: 'Extended Stay Rate',
    name: 'extendedStayRate',
  },
  {
    title: 'Bathing/Grooming',
    placeholder: 'Bathing/Grooming',
    name: 'bathingGrooming',
  },
  {
    title: 'Sitter Pick- up and drop-off',
    placeholder: 'pay per service',
    name: 'payPerService',
  },
];

export const availabilityInput = [
  {
    title: 'Are you home full - time during the week?',
    name: 'homeFullTimeInWeek',
    id: 110,
    radio: true,
    square: false,
    options: [
      {
        id: 5,
        type: 'Yes',
      },
      {
        id: 6,
        type: 'No',
      },
    ],
  },
  {
    title: 'Are you home full - time during the weekend?',
    subtitle: '',
    options: [
      {id: 29, name: 'S'},
      {id: 30, name: 'M'},
      {id: 31, name: 'T'},
      {id: 32, name: 'W'},
      {id: 33, name: 'T'},
      {id: 34, name: 'F'},
      {id: 35, name: 'S'},
    ],
  },
  {
    title: 'Are you home full - time during the day?',
    name: 'homeFullTimeInDay',
    id: 111,
    radio: true,
    square: false,
    options: [
      {
        id: 1,
        type: '0-2 hours',
      },
      {
        id: 2,
        type: '2-4 hours',
      },
      {
        id: 3,
        type: '2-4 hours',
      },
      {
        id: 4,
        type: '2-4 hours',
      },
    ],
  },
  {
    title: 'Are you home full - time during the night?',
    placeholder: 'Are you home full - time during the night?',
    name: 'homeFullTimeInNight',
    select: true,
  },
];
export const aboutYourHome = [
  {
    title: 'What type of home do you live in?',
    name: 'homeType',
    id: 101,
    radio: true,

    options: [
      {id: 7, type: 'House'},
      {id: 8, type: 'Apartment'},
      {id: 9, type: 'Farm'},
    ],
  },
  {
    title: 'What type of yard do you have?',
    name: 'yardType',
    id: 102,
    radio: true,
    options: [
      {id: 34, type: 'Fenced yard'},
      {id: 35, type: 'Unfenced yard'},
      {id: 36, type: 'No yard'},
    ],
  },
  {
    title: 'What can pet owners expect when boarding at you home?',
    subtitle: '( Check all that apply )',
    name: 'petOwnerBoarding',
    id: 103,
    square: true,
    options: [
      {id: 10, type: 'Smoking inside home'},
      {id: 11, type: 'Children age 0 - 5'},
      {id: 12, type: 'Children age 6 - 12'},
      {id: 13, type: 'Dogs are allowed on furniture'},
      {id: 14, type: 'Dogs are allowed on bed'},
      {id: 15, type: 'Cats in home'},
      {id: 16, type: 'Caged pets in home'},
      {id: 17, type: 'None of the above'},
    ],
  },
  {
    title: 'Are you able to host any of the following?',
    subtitle: '( Check all that apply )',
    name: 'hosting',
    id: 104,
    square: true,
    options: [
      {id: 18, type: 'Pets from different families at the same time.'},
      {id: 19, type: 'Puppies under 1 year old'},
      {id: 20, type: 'Dogs that are not crate trained'},
      {id: 21, type: 'Unneutered male dogs'},
      {id: 22, type: 'Unneutered female dogs'},
      {id: 23, type: 'Female dogs in heat'},
      {id: 24, type: 'None of the above'},
    ],
  },
];
export const CancellationPolicy = [
  {
    title: 'What is your cancellation policy for Dog Boarding?',
    name: 'homeType',
    id: 105,
    radio: true,
    options: [
      {id: 25, type: 'Same Day'},
      {id: 26, type: 'One Day'},
      {id: 27, type: 'Three Day'},
      {id: 28, type: 'Seven Day'},
    ],
  },
];
export const petPreference = [
  {
    title: 'What type of pets can you host in your home?',
    subtitle: '( Check all that apply )',
    name: 'petPreference',
    id: 106,
    square: true,
    radio: false,
    options: [
        {id: 36, type: 'Small dog ( 0-15 Ibs )'},
        {id: 37, type: 'Medium dog ( 0-15 Ibs )'},
        {id: 38, type: 'Large dog ( 0-15 Ibs )'},
        {id: 39, type: 'Giant dog ( 0-15 Ibs )'},
        {id: 40, type: 'Cat'},
    ],
  },
];
