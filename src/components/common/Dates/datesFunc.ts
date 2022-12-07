const today = new Date();
export function isSameDate(date: string) {
  if (
    today.toDateString() === new Date(date?.replace(/-/g, '/')).toDateString()
  ) {
    return true;
  }
  return false;
}

export const datePassed = (date: any) => {
  return new Date(date?.replace(/-/g, '/')) < today;
};
export const dateEquOrPassed = (date: any) => {
  return today >= new Date(date?.replace(/-/g, '/'));
};
export const isComming = (date: any) => {
  return new Date(date?.replace(/-/g, '/')) > today;
};
export const isDateNotFound = (allDates: any) => {
  return (
    allDates?.findIndex(
      (f: any) => new Date(f.localDate?.replace(/-/g, '/')) === today,
    ) === -1
  );
};
