export const availabilityInput = {
  title: 'Are you home full - time during the week?',
  name: 'fulltime',
  id: 100,
  radio: true,
  square: false,
  linkTitle: 'Why is availability important?',
  flex: 0.5,
  options: [
    {
      id: 5,
      type: 'Yes',
      checked: true,
    },
    {
      id: 6,
      type: 'No',
      checked: false,
    },
  ],
};
export const availabilitySelectDay = {
  title: 'What days of the week will you typically be available for Boarding?',
  name: 'selectDay',
  subtitle:
    'Select the days you are typically available. You can update your calendar at any time.',
  id: 101,
  options: [
    {id: 29, type: 'Sat', value: false, name: 'sat'},
    {id: 30, type: 'Sun', value: false, name: 'sun'},
    {id: 31, type: 'Mon', value: false, name: 'mon'},
    {id: 32, type: 'Tue', value: false, name: 'tue'},
    {id: 33, type: 'Wed', value: false, name: 'wed'},
    {id: 34, type: 'Thu', value: false, name: 'thu'},
    {id: 35, type: 'Fri', value: false, name: 'fri'},
  ],
};
export const availabilityHomeFullTimeInDay = {
  title: 'How frequently can you provide potty break?',
  name: 'pottyBreak',
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
      type: '4-8 hours',
      checked: false,
    },
    {
      id: 4,
      type: '8+ hours',
      checked: false,
    },
  ],
};
export const availabilityAdvancedNotice = {
  title:
    'How far in advance do you need new clients to reach out to you before a booking ?',
  placeholder: 'Select the time you need',
  name: 'advancedNotice',
  linkTitle: 'How will advance notice be used?',
  select: true,
  data: [],
};
