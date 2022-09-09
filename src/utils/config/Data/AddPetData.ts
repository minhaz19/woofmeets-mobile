export const genders = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    label: 'Female',
    value: 'FEMALE',
  },
];
export const contries = [
  {
    label: 'Bangladesh',
    value: 'Bangladesh',
  },
  {
    label: 'USA',
    value: 'USA',
  },
  {
    label: 'India',
    value: 'India',
  },
];

export const addPetCheck1 = {
  id: 100,
  header: 'Pet Details',
  title: 'What is pet your pet?',
  subTitle: 'Provider your sitter with a description of your pet',
  name: 'type',
  pet: [
    {
      id: 1,
      type: 'Dog',
      value: 'DOG',
    },
    {id: 2, type: 'Cat', value: 'CAT'},
  ],
};

export const addPetInfoInputs = [
  {title: 'Name', placeholder: 'Enter Pet Name', name: 'name'},
  {
    title: 'Weight (Ibs)',
    placeholder: 'Enter Weight',
    name: 'weight',
    number: true,
  },
  {
    title: 'Age (Yr)',
    placeholder: 'Enter year',
    flex: 0.5,
    name: 'ageYear',
    number: true,
  },
  {
    title: 'Age (Mo)',
    placeholder: 'Month',
    name: 'ageMonth',
    flex: 0.5,
    number: true,
  },
  {
    title: 'Select Gender',
    placeholder: 'Enter Pet Name',
    select: true,
    name: 'gender',
  },
];

export const additionalDetailChecks = [
  {
    title: 'Microchipped?',
    name: 'microchipped',
    id: 101,
    radio: [
      {id: 7, type: 'Yes', value: true},
      {id: 8, type: 'No', value: false},
    ],
  },
  {
    title: 'Spayed/Neutered?',
    name: 'spayedOrNeutered',
    id: 102,
    radio: [
      {id: 9, type: 'Yes', value: true},
      {id: 10, type: 'No', value: false},
    ],
  },
  {
    title: 'House Trained?',
    name: 'houseTrained',
    id: 103,
    radio: [
      {id: 11, type: 'Yes', value: 'YES'},
      {id: 12, type: 'No', value: 'NO'},
      {id: 13, type: 'Unsure', value: 'UNSURE'},
      {id: 14, type: 'Depends', value: 'DEPENDS'},
    ],
    input: {
      id: 14,
      title: 'Additional details',
      placeholder: 'Please provide more details',
      name: 'houseTrainedAdditionalDetails',
      numberOfLines: 20,
    },
  },
  {
    title: 'Friendly With Children?',
    name: 'childFriendly',
    id: 105,
    radio: [
      {id: 18, type: 'Yes', value: 'YES'},
      {id: 19, type: 'No', value: 'NO'},
      {id: 20, type: 'Unsure', value: 'UNSURE'},
      {id: 21, type: 'Depends', value: 'DEPENDS'},
    ],
    input: {
      id: 21,
      title: 'Additional details',
      placeholder: 'Please provide more details',
      name: 'childFrinedlyAdditionalDetails',
      numberOfLines: 20,
    },
  },
  {
    title: 'Friendly With Dogs?',
    id: 106,
    name: 'dogFriendly',
    radio: [
      {id: 22, type: 'Yes', value: 'YES'},
      {id: 23, type: 'No', value: 'NO'},
      {id: 24, type: 'Unsure', value: 'UNSURE'},
      {id: 25, type: 'Depends', value: 'DEPENDS'},
    ],
    input: {
      id: 25,
      title: 'Additional details',
      placeholder: 'Please provide more details',
      name: 'dogFrinedlyAdditionalDetails',
      numberOfLines: 20,
    },
  },
  {
    title: 'Friendly With Cats?',
    name: 'catFriendly',
    id: 107,
    radio: [
      {id: 26, type: 'Yes', value: 'YES'},
      {id: 27, type: 'No', value: 'NO'},
      {id: 28, type: 'Unsure', value: 'UNSURE'},
      {id: 29, type: 'Depends', value: 'DEPENDS'},
    ],
    input: {
      id: 29,
      title: 'Additional details',
      placeholder: 'Please provide more details',
      name: 'catFrinedlyAdditionalDetails',
      numberOfLines: 20,
    },
  },
];

export const careInfoChecks = {
  header: 'Care information',
  subTitle:
    'Provide your sitter with a description for walking, feeding and other care',
  careInfo: [
    {
      title: 'Potty break schedule?',
      id: 108,
      name: 'pottyBreakSchedule',
      radio: [
        {type: 'Every Hour', id: 30, value: 'Every Hour'},
        {type: '2 Hours', id: 31, value: '2 Hours'},
        {type: '4 Hours', id: 32, value: '4 Hours'},
        {type: '8 Hours', id: 33, value: '8 Hours'},
        {type: 'Custom', id: 34, value: 'Custom'},
      ],
      input: {
        id: 34,
        title: 'Additional details',
        placeholder: 'Please provide more details',
        name: 'pottyBreakScheduleDetails',
        numberOfLines: 20,
      },
    },
    {
      title: 'Feeding schedule?',
      id: 109,
      name: 'feedingSchedule',
      radio: [
        {id: 35, type: 'Morning', value: 'Morning'},
        {id: 36, type: 'Twice a day', value: 'Twice a day'},
        {
          id: 37,
          type: 'Custom',
          value: 'Custom',
        },
      ],
      input: {
        id: 37,
        title: 'Additional details',
        placeholder: 'Please provide more details',
        name: 'feedingScheduleDetails',
        numberOfLines: 20,
      },
    },
    {
      title: 'Energy Level?',
      id: 110,
      name: 'energyLevel',
      radio: [
        {id: 38, type: 'High', value: 'HIGH'},
        {id: 39, type: 'Moderate', value: 'MODERATE'},
        {id: 40, type: 'Low', value: 'LOW'},
      ],
    },
    {
      title: 'Can be left alone',
      id: 111,
      name: 'canLeftAlone',
      radio: [
        {id: 41, type: '< 1 hour', value: '< 1 hour'},
        {id: 42, type: '1 - 4 hour', value: '1 - 4 hour'},
        {id: 43, type: '4 - 8 hours', value: '4 - 8 hours'},
        {id: 44, type: 'Custom', value: 'Custom'},
      ],
      input: {
        id: 44,
        title: 'Additional details',
        placeholder: 'Please provide more details',
        name: 'canLeftAloneDetails',
        numberOfLines: 20,
      },
    },
  ],
};
export const medicationChecks = {
  title: 'Medicaition (select all that apply)',
  id: 112,
  pet: [
    {id: 0, type: 'Pill', name: 'pill', value: null, active: false},
    {
      id: 1,
      type: 'Topical',
      value: null,
      name: 'topical',
      active: false,
    },
    {
      id: 2,
      type: 'Injection',
      value: null,
      name: 'injection',
      active: false,
    },
  ],
  input: [
    {
      id: 'pill',
      title: 'Name of pill medication',
      placeholder: 'Please provide pill',
      name: 'pillMedication',
    },
    {
      id: 'topical',
      title: 'Name of topical medication',
      placeholder: 'Enter topical medication',
      name: 'topicalMedication',
    },
    {
      id: 'injection',
      title: 'Name of injection medication',
      placeholder: 'Enter injection medication',
      name: 'injectionMedication',
    },
  ],
};
export const additionalDetailsBottomInputs = [
  {
    title: 'Anything else a stter should know?',
    placeholder: 'Please additional information for sitter',
    name: 'sitterInstructions',
    numberOfLines: 20,
  },
  {
    title: 'Veterinary information',
    subTitle: 'Add your pets name, address and phone number',
    placeholder: 'Add your vets details',
    name: 'vetInfo',
    numberOfLines: 20,
  },
];
export const petDescriptionInput = {
  title: 'About Your Pet',
  placeholder: 'Add a description of your pet',
  name: 'about',
  numberOfLines: 20,
};
export const additionalDescriptionInput = {
  title: 'Additional Details',
  placeholder: 'Please provide more details',
  name: 'additionalDescription',
  numberOfLines: 20,
};
