/* eslint-disable radix */

import Colors from '../../../constants/Colors';

export const orderAndStyleRange = (range: any, type: string) => {
  let orderRange: any = [];
  let styledMarkedRange: any = {};
  if (type === 'RANGE') {
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
    unorderedRange &&
      unorderedRange.map((or: string) =>
        orderRange.push(
          or
            .split('-')
            .map((p: string) => (parseInt(p) <= 9 ? '0' + p : p))
            .join('-'),
        ),
      );

    const styledRange =
      orderRange.length !== 0 &&
      orderRange.map((_: string, i: number) => ({
        [orderRange[i]]: {
          startingDay: i === 0,
          color: Colors.primary,
          textColor: 'white',
          endingDay: i === orderRange.length - 1,
        },
      }));

    styledRange &&
      styledRange?.map(
        (item: any) =>
          // @ts-ignore
          (styledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
      );
  } else if (type === 'MULTI') {
    orderRange.push(range.dateString);
    const styledRange = orderRange?.map((_: string, i: number) => ({
      [orderRange[i]]: {
        customStyles: {
          container: {
            backgroundColor: Colors.primary,
            elevation: 2,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'white',
          },
        },
      },
    }));
    styledRange &&
      styledRange?.map(
        (item: any) =>
          // @ts-ignore
          (styledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
      );
  }
  return {styledMarkedRange};
};
