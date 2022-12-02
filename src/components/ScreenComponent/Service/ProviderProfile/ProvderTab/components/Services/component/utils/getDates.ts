import {format} from 'date-fns';

export const getDates = (payload: any, currentMonth?: string) => {
  const startDate = format(
    currentMonth === 'current' || currentMonth === 'fullYear'
      ? new Date()
      : new Date(payload.year, payload.month - 1, 1),
    'yyyy-MM-dd',
  );
  const endDate = format(
    'fullYear'
      ? new Date(payload.year + 1, 12, 0)
      : new Date(payload.year, payload.month, 0),
    'yyyy-MM-dd',
  );
  return {
    startDate,
    endDate,
  };
};
