import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';

let modData: any = [];
export const useDayTimeSlot = () => {
  const {
    selectedDays,
    isRecurring,
    repeatDate,
    multiDate,
    recurringModDates,
    specificModDates,
  } = useWatch();

  const [newData, setDatas] = useState(modData);
  const getRecurringDays = (rd: any, rsd: any, pod: any) => {
    const output = rd?.filter((obj: any) => {
      return rsd.indexOf(obj.day) !== -1;
    });

    const recurring = output?.map((item: any, index: number) => ({
      id: index + 1,
      date: item.day,
      visits:
        pod && pod?.find((elm: any) => elm.date === item.day)?.visits
          ? pod?.find((elm: any) => elm.date === item.day)?.visits
          : [],
    }));
    return recurring;
  };

  useMemo(() => {
    if (isRecurring) {
      const recurring = getRecurringDays(
        repeatDate,
        selectedDays,
        recurringModDates,
      );
      setDatas(recurring);
    } else if (!isRecurring) {
      const multi = multiDate?.map((item: any) => ({
        // id: index + 1,
        date: item,
        visits:
          specificModDates &&
          specificModDates?.find((elm: any) => elm.date === item)?.visits
            ? specificModDates?.find((elm: any) => elm.date === item)?.visits
            : [],
      }));
      setDatas(multi);
    }
  }, [
    isRecurring,
    repeatDate,
    selectedDays,
    recurringModDates,
    specificModDates,
    multiDate,
  ]);

  return {isRecurring, newData};
};
