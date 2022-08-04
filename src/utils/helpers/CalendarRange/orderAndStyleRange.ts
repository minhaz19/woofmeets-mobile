/* eslint-disable radix */

export const orderAndStyleRange = (range: any, color: string) => {
  const unorderedRange =
    range &&
    range?.map(
      (date: string | number | Date) =>
        new Date(date).getFullYear() +
        '-' +
        // @ts-ignore
        parseInt(new Date(date).getMonth() + 1) +
        '-' +
        new Date(date).getDate(),
    );
  let orderRange: any = [];
  unorderedRange &&
    unorderedRange.map((or: string) =>
      orderRange.push(
        or
          .split('-')
          .map((p: string) => (parseInt(p) <= 9 ? '0' + p : p))
          .join('-'),
      ),
    );
  console.log('orderrange', orderRange);

  const styledRange =
    orderRange.length !== 0 &&
    orderRange.map((_: string, i: number) => ({
      [orderRange[i]]: {
        startingDay: i === 0,
        color: color,
        textColor: 'white',
        endingDay: i === orderRange.length - 1,
      },
    }));
  let styledMarkedRange: any = {};

  styledRange !== false &&
    styledRange?.map(
      (item: any) =>
        // @ts-ignore
        (styledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
    );
  return {styledMarkedRange};
};
