export const availabilityInput = {
  title: 'Are you home full-time during the week?',
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
  title: 'What days of the week will you typically be available?',
  name: 'selectDay',
  subtitle:
    'This will update your generic availability. You can edit any date individually by going to your calendar.',
  id: 101,
  options: [
    {id: 29, type: 'Sat', value: null, name: 'sat'},
    {id: 30, type: 'Sun', value: null, name: 'sun'},
    {id: 31, type: 'Mon', value: null, name: 'mon'},
    {id: 32, type: 'Tue', value: null, name: 'tue'},
    {id: 33, type: 'Wed', value: null, name: 'wed'},
    {id: 34, type: 'Thu', value: null, name: 'thu'},
    {id: 35, type: 'Fri', value: null, name: 'fri'},
  ],
};
export const availabilityHomeFullTimeInDay = {
  title: 'How frequently can you provide potty breaks?',
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
