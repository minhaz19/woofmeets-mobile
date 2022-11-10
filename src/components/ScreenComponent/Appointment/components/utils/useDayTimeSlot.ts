import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';

let modData: any = [];
export const useDayTimeSlot = () => {
  const {
    selectedDays,
    isRecurring,
    repeatDate,
    multiDate,
    proposalScheduleDate,
    proposalRecurringDate,
  } = useWatch();
  console.log('');
  const [newData, setDatas] = useState(modData);
  const getRecurringDays = (rd: any, rsd: any, pod: any) => {
    const output = rd?.filter((obj: any) => {
      return rsd.indexOf(obj.day) !== -1;
    });

    const recurring = output?.map((item: any, index: number) => ({
      id: index + 1,
      date: item.day,
      initalSlot:
        pod && pod?.length !== 0
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
        proposalRecurringDate,
      );
      setDatas(recurring);
    } else if (!isRecurring) {
      const multi = multiDate?.map((item: any, index: number) => ({
        id: index + 1,
        date: item,
        initalSlot:
          proposalRecurringDate && proposalScheduleDate?.length !== 0
            ? proposalScheduleDate?.find((elm: any) => elm.date === item)
                ?.visits
            : [],
      }));
      setDatas(multi);
    }
  }, [
    isRecurring,
    repeatDate,
    selectedDays,
    proposalRecurringDate,
    multiDate,
    proposalScheduleDate,
  ]);

  return {isRecurring, newData};
};
