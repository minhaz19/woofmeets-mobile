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
export const ProviderStories = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
    name: 'Meer Habibi',
    stories: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1510215744419-742d9dce947f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8MTA4MHgxOTIwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200',
        swipeText: 'Custom swipe text for this story',
        onPress: () => {},
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1493509094819-bd2d26fac21b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8MTA4MHgxOTIwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200',
      },
    ],
  },
];
