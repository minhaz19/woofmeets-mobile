export const RatesInput = [
  {
    title: 'Holiday Rate',
    placeholder: 'Holiday Rate',
    name: 'holiDayRate',
    icon: true,
  },
  {
    title: 'Additional dog Rate',
    placeholder: 'Additional dog Rate',
    name: 'additionalDogRate',
    icon: true,
  },
  {
    title: 'Puppy Rate',
    placeholder: 'Puppy Rate',
    name: 'puppyRate',
    icon: true,
  },
  {
    title: 'Cate Rate',
    placeholder: 'cate Rate',
    name: 'catRate',
    icon: true,
  },
  {
    title: 'Additional Cat',
    placeholder: 'Additional Cat',
    name: 'additionalCat',
    icon: true,
  },
  {
    title: 'Extended Stay Rate',
    placeholder: 'Extended Stay Rate',
    name: 'extendedStayRate',
    icon: true,
  },
  {
    title: 'Bathing/Grooming',
    placeholder: 'Bathing/Grooming',
    name: 'bathingGrooming',
    icon: true,
    checkbox: 'Offer for free',
  },
  {
    title: 'Sitter Pick- up and drop-off',
    placeholder: 'Sitter Pick- up and drop-off',
    name: 'pickUpDropOff',
    icon: true,
  },
];

export const Rates = [
  {
    title: 'What you want clients to pay per service:',
    placeholder: 'pay per service',
    name: 'payPerService',
    checkbox: 'Update my additional rates based on my base rate',
    linkText: 'Need help with rates?',
    shortText: 'Turn off to adjust your rates manually',
    additionalRates: 'Show additional rates',
    icon: false,
  },
];

export const availabilityInput = [
  {
    title: 'Are you home full - time during the week?',
    name: 'homeFullTimeInWeek',
    id: 100,
    radio: true,
    square: false,
    linkTitle: 'Why is availability important?',
    flex: 0.5,
    options: [
      {
        id: 5,
        type: 'Yes',
        checked: false,
      },
      {
        id: 6,
        type: 'No',
        checked: false,
      },
    ],
  },
  {
    title:
      'What days of the week will you typically be available for Boarding?',
    name: 'selectDay',
    subtitle:
      'Select the days you are typically available. You can update your calendar at any time.',
    id: 101,
    options: [
      {id: 29, type: 'S', checked: false},
      {id: 30, type: 'M', checked: false},
      {id: 31, type: 'T', checked: false},
      {id: 32, type: 'W', checked: false},
      {id: 33, type: 'T', checked: false},
      {id: 34, type: 'F', checked: false},
      {id: 35, type: 'S', checked: false},
    ],
  },
  {
    title: 'How frequently can you provide potty break?',
    name: 'homeFullTimeInDay',
    id: 102,
    radio: true,
    square: false,
    options: [
      {
        id: 1,
        type: '0-2 hours',
        checked: false,
      },
      {
        id: 2,
        type: '2-4 hours',
        checked: false,
      },
      {
        id: 3,
        type: '2-4 hours',
        checked: false,
      },
      {
        id: 4,
        type: '2-4 hours',
        checked: false,
      },
    ],
  },
  {
    title:
      'How far in advance do you need new clients to reach out to you before a booking ?',
    placeholder: 'Select the time you need',
    name: 'advancedNotice',
    linkTitle: 'How will advance notice be used?',
    select: true,
    data: [],
  },
];
export const aboutYourHome = [
  {
    title: 'What type of home do you live in?',
    name: 'homeType',
    id: 103,
    radio: true,
    square: false,
    options: [
      {id: 7, type: 'House'},
      {id: 8, type: 'Apartment'},
      {id: 9, type: 'Farm'},
    ],
  },
  {
    title: 'What type of yard do you have?',
    name: 'yardType',
    id: 104,
    radio: true,
    square: false,
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
    id: 105,
    radio: false,
    square: true,
    options: [
      {id: 10, type: 'Smoking inside home', checked: false},
      {id: 11, type: 'Children age 0 - 5', checked: false},
      {id: 12, type: 'Children age 6 - 12', checked: false},
      {id: 13, type: 'Dogs are allowed on furniture', checked: false},
      {id: 14, type: 'Dogs are allowed on bed', checked: false},
      {id: 15, type: 'Cats in home', checked: false},
      {id: 16, type: 'Caged pets in home', checked: false},
      {id: 17, type: 'None of the above', checked: false},
    ],
  },
  {
    title: 'Are you able to host any of the following?',
    subtitle: '( Check all that apply )',
    name: 'hosting',
    id: 106,
    radio: false,
    square: true,
    options: [
      {
        id: 18,
        type: 'Pets from different families at the same time.',
        checked: false,
      },
      {id: 19, type: 'Puppies under 1 year old', checked: false},
      {id: 20, type: 'Dogs that are not crate trained', checked: false},
      {id: 21, type: 'Unneutered male dogs', checked: false},
      {id: 22, type: 'Unneutered female dogs', checked: false},
      {id: 23, type: 'Female dogs in heat', checked: false},
      {id: 24, type: 'None of the above', checked: false},
    ],
  },
];
export const CancellationPolicy = [
  {
    title: 'What is your cancellation policy for Dog Boarding?',
    name: 'cancellationPolicy',
    id: 107,
    radio: true,
    square: false,
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
    id: 108,
    square: true,
    radio: false,
    options: [
      {id: 36, type: 'Small dog ( 0-15 Ibs )', checked: false},
      {id: 37, type: 'Medium dog ( 0-15 Ibs )', checked: false},
      {id: 38, type: 'Large dog ( 0-15 Ibs )', checked: false},
      {id: 39, type: 'Giant dog ( 0-15 Ibs )', checked: false},
      {id: 40, type: 'Cat', checked: false},
    ],
  },
];
