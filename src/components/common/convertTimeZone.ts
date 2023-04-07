import {formatDate} from './formatDate';

export const convertDateAndTime = (date: any, timeZone: any) => {
  const convertDate = formatDate(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
  return convertDate;
};
