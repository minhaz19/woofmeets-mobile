import {
  Boarding,
  DayLight,
  Dog,
  DropIn,
} from '../../../assets/svgs/Services_SVG';

export const providerDatas = [
  {
    title: 'Steve Goodman home 🏡',
    viewAll: 'View All',
    subInfo: [
      {
        info: 'Lives in an apartment',
      },
      {
        info: 'Non smoking household',
      },
      {
        info: 'has Cats',
      },
      {
        info: 'Does not have a yard',
      },
      {
        info: 'No children presents',
      },
    ],
  },
  {
    title: 'In your home 🏠',

    subInfo: [
      {
        info: 'Dogs over 1 year old ',
      },
    ],
  },
  {
    title: 'Steve Goodman skills 🤹‍♀️',
    viewAll: 'View All',
    subInfo: [
      {
        info: 'Senior dog experience',
      },
      {
        info: 'Injection medication administration',
      },
    ],
  },
  {
    title: 'About',
    subInfo: [
      {
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et Show More',
      },
    ],
  },
];
export const serivesData = [
  {
    petType: [
      {
        Icon: Dog,
        weight: '0-15',
        weightType: 'Pounds',
        id: 0,
      },
      {
        Icon: Dog,
        weight: '16-40',
        weightType: 'Pounds',
        id: 1,
      },
      {
        Icon: Dog,
        weight: '41-100',
        weightType: 'Pounds',
        id: 2,
      },
      {
        Icon: Dog,
        weight: '101+',
        weightType: 'Pounds',
        id: 3,
      },
    ],
    petPricing: [
      {
        Icon: Boarding,
        sittingType: 'Boarding',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Dog Rate',
            price: '$57',
            perNight: 'Per night per additional dog',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Cat Care',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Cat',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Extended Care',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
      {
        Icon: DayLight,
        sittingType: 'Doggy Day Care',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Dog Rate',
            price: '$57',
            perNight: 'Per night per additional dog',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
    ],
  },
  {
    petType: [
      {
        Icon: Dog,
        weight: '0-15',
        weightType: 'Pounds',
        id: 4,
      },
      {
        Icon: Dog,
        weight: '16-40',
        weightType: 'Pounds',
        id: 5,
      },
      {
        Icon: Dog,
        weight: '41-100',
        weightType: 'Pounds',
        id: 6,
      },
      {
        Icon: Dog,
        weight: '101+',
        weightType: 'Pounds',
        id: 7,
      },
    ],
    petPricing: [
      {
        Icon: DropIn,
        sittingType: 'Boarding',
        location: 'in the sitters home',
        price: '$31',
        perNight: 'Per night',
        pricingInfo: [
          {
            pricingInfoTitle: '60 minite rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Holiday Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Puppy Rate',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Cat Care',
            price: '$57',
            perNight: 'Per night',
          },
          {
            pricingInfoTitle: 'Additional Cat',
            price: '$57',
            perNight: 'Per night',
          },
        ],
      },
    ],
  },
];
