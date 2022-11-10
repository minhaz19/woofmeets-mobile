import {format} from 'date-fns';

export const _dateRange = (startDate: string, endDate: string, steps = 1) => {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(format(new Date(currentDate), 'yyyy-MM-dd'));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
};
