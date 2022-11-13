import {addMinutes, format} from 'date-fns';

export const formatDate = (date: Date, formatType: string) => {
  const fDate = new Date(date);
  return format(addMinutes(fDate, fDate.getTimezoneOffset()), formatType);
};
