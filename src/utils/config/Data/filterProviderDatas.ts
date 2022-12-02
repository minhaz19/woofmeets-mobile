import {BuildSvg, HomeSvg, FarmSvg} from '../../../assets/svgs/SVG_LOGOS';

export const myPet = [
  {
    image: require('../../../assets/image/selectServiceImage/mypet.png'),
    name: 'Puppy',
  },
  {
    image: require('../../../assets/image/selectServiceImage/mypet.png'),
    name: 'Puppy',
  },
  {
    image: require('../../../assets/image/selectServiceImage/mypet.png'),
    name: 'Puppy',
  },
];
export const filterPetSwitch = [
  {
    heading: 'Yard Type',
    switch: [
      {
        title: 'Fenced',
        id: 1,
        name: 'FENCED',
      },
      {
        title: 'Unfenced',
        id: 2,
        name: 'UNFENCED',
      },
      {
        title: 'No Yard',
        id: 3,
        name: 'NO_YARD',
      },
    ],
  },
  // {
  //   heading: 'Daytime Availability',
  //   switch: [
  //     {
  //       title: 'Sitter is home full-time',
  //       id: 1,
  //       name: 'sitterHomeFTime',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Pets in the home',
  //   switch: [
  //     {
  //       title: 'Does not own a dog',
  //       name: 'ownDog',
  //     },
  //     {
  //       title: 'Does not own a cat',
  //       name: 'ownCat',
  //     },
  //     {
  //       title: 'Accepts one client at a time',
  //       name: 'oncClient',
  //     },
  //     {
  //       title: 'Does not own caged pet',
  //       name: 'cagedPet',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Housing Condition',
  //   switch: [
  //     {
  //       title: 'Has fenced yard',
  //       name: 'fencedYard',
  //     },
  //     {
  //       title: 'Dogs allowed on furniture',
  //       name: 'furniture',
  //     },
  //     {
  //       title: 'Dogs allowed on bed',
  //       name: 'onBed',
  //     },
  //     {
  //       title: 'Non-smoking home',
  //       name: 'nonSmoking',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Services',
  //   switch: [
  //     {
  //       title: 'Cat care',
  //       name: 'catCare',
  //     },
  //     {
  //       title: 'Accepts unspayed female dogs',
  //       name: 'unspayedF',
  //     },
  //     {
  //       title: 'Acceipts non neutered male dogs',
  //       name: 'neuteredM',
  //     },
  //     {
  //       title: 'Bathing/Grooming',
  //       name: 'bathing',
  //     },
  //     {
  //       title: 'Dog first-aid/CPR',
  //       name: 'firstAid',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Children in the home',
  //   switch: [
  //     {
  //       title: 'Has no children',
  //       name: 'hasChildren',
  //     },
  //     {
  //       title: 'No children 0 - 5 years old',
  //       name: 'children5',
  //     },
  //     {
  //       title: 'No children 6 - 12 years old',
  //       name: 'children10',
  //     },
  //   ],
  // },
];
export const homeType = [
  {
    type: HomeSvg,
    title: 'House',
    slug: 'HOUSE',
  },
  {
    type: BuildSvg,
    title: 'Apartment',
    slug: 'APARTMENT',
  },
  {
    type: FarmSvg,
    title: 'Business',
    slug: 'BUSINESS',
  },
];

export const days = [
  {
    id: 1,
    day: 'M',
    selected: false,
    value: 'Monday',
  },
  {
    id: 2,
    day: 'T',
    selected: false,
    value: 'Tuesday',
  },
  {
    id: 3,
    day: 'W',
    selected: false,
    value: 'Wednesday',
  },
  {
    id: 4,
    day: 'T',
    selected: false,
    value: 'Thursday',
  },
  {
    id: 5,
    day: 'F',
    selected: false,
    value: 'Friday',
  },
  {
    id: 6,
    day: 'S',
    selected: false,
    value: 'Saturday',
  },
  {
    id: 7,
    day: 'S',
    selected: false,
    value: 'Sunday',
  },
];
