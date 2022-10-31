import {format} from 'date-fns';

export const getSelectedDates = (payload: any, currentMonth: string) => {
  const startDate = format(
    currentMonth === 'current'
      ? new Date()
      : new Date(payload.year, payload.month - 1, 1),
    'yyyy-MM-dd',
  );
  var end = new Date(payload.year, payload.month - 1, 1);
  end.setUTCHours(23, 59, 59, 999);
  const endDate = format(
    new Date(payload.year, payload.month, 0),
    'yyyy-MM-dd',
  );
  //   const endDate = format(new Date(end), 'yyyy-MM-dd');
  // const endDate = format(
  //   new Date(payload.year, payload.month, 0),
  //   'yyyy-MM-dd',
  // );
  return {
    startDate,
    endDate,
  };
};
