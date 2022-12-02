import {addMinutes, format} from 'date-fns';
import moment from 'moment-timezone';

export const formatDate = (date: Date, formatType: string) => {
  const fDate = new Date(date);
  return format(addMinutes(fDate, fDate.getTimezoneOffset()), formatType);
};

export const convertDateTZ = (date: string, timezone: string) => {
  return moment.tz(date, 'YYYY-MM-DD', timezone).format();
};

export const convertToLocalTZ = (
  date: string,
  timezone: string,
  formatType?: string,
) => {
  return moment
    .tz(date, timezone)
    .format(formatType ? formatType : 'YYYY-MM-DD');
};
