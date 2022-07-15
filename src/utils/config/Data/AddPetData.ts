import {addPetTypes} from '../Types/addPet.types';

export const genders = ['Male', 'Female', 'Others'];
export const addPetInputs: addPetTypes = [
  {
    id: 100,
    header: 'Pet Details',
    title: 'What is pet your pet?',
    subTitle: 'Provider your sitter with a description of your pet',
    name: 'petType',
    pet: [
      {
        id: 1,
        type: 'Dog',
      },
      {id: 2, type: 'Cat'},
      {id: 3, type: 'Others'},
    ],
  },
  {
    inputs: [
      {title: 'Name', placeholder: 'Enter Pet Name', name: 'petName'},
      {title: 'Weight (Ibs)', placeholder: 'Enter Weight', name: 'weight'},
      {
        title: 'Age (Yr)',
        placeholder: 'Enter year',
        flex: 0.5,
        name: 'ageYr',
      },
      {title: 'Age (Mo)', placeholder: 'Month', name: 'ageMo', flex: 0.5},
      {
        title: 'Select Gender',
        placeholder: 'Enter Pet Name',
        select: true,
        name: 'gender',
      },
      {
        title: 'Breeds',
        placeholder: 'Enter All Breeds that apply, if you are cat',
        name: 'breeds',
      },
    ],
  },
  {
    additionalDetails: [
      {
        title: 'Microchipped?',
        name: 'microchipped',
        id: 101,
        radio: [
          {id: 7, type: 'Yes'},
          {id: 8, type: 'No'},
        ],
      },
      {
        title: 'Spayed/Neutered?',
        name: 'spayedNeutered',
        id: 102,
        radio: [
          {id: 9, type: 'Yes'},
          {id: 10, type: 'No'},
        ],
      },
      {
        title: 'House Trained?',
        name: 'houseTrained',
        id: 103,
        radio: [
          {id: 11, type: 'Yes'},
          {id: 12, type: 'No'},
          {id: 13, type: 'Unsure'},
        ],
      },
      {
        title: 'Friendly With Children?',
        name: 'friendlyChildren',
        id: 105,
        radio: [
          {id: 18, type: 'Yes'},
          {id: 19, type: 'No'},
          {id: 20, type: 'Unsure'},
          {id: 21, type: 'Depends'},
        ],
      },
      {
        title: 'Friendly With Dogs?',
        id: 106,
        name: 'friendlyDogs',
        radio: [
          {id: 22, type: 'Yes'},
          {id: 23, type: 'No'},
          {id: 24, type: 'Unsure'},
          {id: 25, type: 'Depends'},
        ],
      },
      {
        title: 'Friendly With Cats?',
        name: 'friendlyCats',
        id: 107,
        radio: [
          {id: 26, type: 'Yes'},
          {id: 27, type: 'No'},
          {id: 28, type: 'Unsure'},
          {id: 29, type: 'Depends'},
        ],
      },
    ],
  },
  {
    title: 'About Your Pet',
    placeholder: 'Add a description of your pet',
    name: 'petDescription',
    numberOfLines: 20,
  },
  {
    header: 'Care information',
    subTitle:
      'Provide your sitter with a description for walking, feeding and other care',
    careInfo: [
      {
        title: 'Potty break schedule?',
        id: 108,
        name: 'pottyBreak',
        radio: [
          {type: 'Every Hour', id: 30},
          {type: '2 Hours', id: 31},
          {type: '4 Hours', id: 32},
          {type: '8 Hours', id: 33},
          {type: 'Custom', id: 34},
        ],
      },
      {
        title: 'Feeding schedule?',
        id: 109,
        name: 'feedingSchedule',
        radio: [
          {id: 35, type: 'Morning'},
          {id: 36, type: 'Twice a day'},
          {
            id: 37,
            type: 'Custom',
          },
        ],
      },
      {
        title: 'Energy Level?',
        id: 110,
        name: 'energyLevel',
        radio: [
          {id: 38, type: 'High'},
          {id: 39, type: 'Moderate'},
          {id: 40, type: 'Low'},
        ],
      },
      {
        title: 'Can be left alone??',
        id: 111,
        name: 'leftAlone',
        radio: [
          {id: 41, type: '< 1 hour'},
          {id: 42, type: '4-8 hours'},
          {id: 43, type: 'Coustom'},
        ],
      },
    ],
  },
  {
    title: 'Additional Details',
    placeholder: 'Please provide more details',
    name: 'additionalDescription',
    numberOfLines: 20,
  },
  {
    title: 'Medicaition (select all that apply)',
    name: 'medication',
    id: 112,
    pet: [
      {id: 4, type: 'Pill'},
      {
        id: 5,
        type: 'Topical',
      },
      {
        id: 6,
        type: 'Injection',
      },
    ],
  },
  {
    inputs: [
      {
        title: 'Name of pill medication',
        placeholder: 'Please provide pill',
        name: 'pillMedicaion',
      },
      {
        title: 'Name of topical medication',
        placeholder: 'Enter topical medication',
        name: 'topicalMedication',
      },
      {
        title: 'Name of injection medication',
        placeholder: 'Enter injection medication',
        name: 'injectionMedication',
      },

      {
        title: 'Anything else a stter should know?',
        placeholder: 'Please additional information for sitter',
        name: 'additionalInfo',
        numberOfLines: 20,
      },
      {
        title: 'Anything else a stter should know?',
        subTitle: 'Add your pets name, address and phone number',
        placeholder: 'Please add pet info',
        name: 'petInfo',
        numberOfLines: 20,
      },
    ],
  },
];
