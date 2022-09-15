import {
  Boarding,
  DayLight,
  Dog,
  DropIn,
} from '../../../assets/svgs/Services_SVG';

export const petSizeType = [
  {
    Icon: Dog,
    weight: '0-15',
    weightType: 'Pounds',
    id: 0,
    size: 'smallDog',
  },
  {
    Icon: Dog,
    weight: '16-40',
    weightType: 'Pounds',
    id: 1,
    size: 'mediumDog',
  },
  {
    Icon: Dog,
    weight: '41-100',
    weightType: 'Pounds',
    id: 2,
    size: 'largeDog',
  },
  {
    Icon: Dog,
    weight: '101+',
    weightType: 'Pounds',
    id: 3,
    size: 'giantDog',
  },
];
export const serivesData = [
  {
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
        id: 0,
        size: 'smallDog',
      },
      {
        Icon: Dog,
        weight: '16-40',
        weightType: 'Pounds',
        id: 1,
        size: 'mediumDog',
      },
      {
        Icon: Dog,
        weight: '41-100',
        weightType: 'Pounds',
        id: 2,
        size: 'largeDog',
      },
      {
        Icon: Dog,
        weight: '101+',
        weightType: 'Pounds',
        id: 3,
        size: 'giantDog',
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
