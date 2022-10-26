import {useMemo, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

let modData: any = [];
export const useDayTimeSlot = () => {
  const {setValue} = useFormContext();
  // const {DIVSpecificDate} = getValues();

  const {
    selectedDays,
    specificModDatesRef,
    recurringModDatesRef,
    isRecurring,
    repeatDate,
    multiDate,
    proposalScheduleDate,
    proposalRecurringDate,
  } = useWatch();
  const [newData, setDatas] = useState(modData);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  const getRecurringDays = (rd: any, rsd: any, pod: any) => {
    const output = rd?.filter((obj: any) => {
      return rsd.indexOf(obj.day) !== -1;
    });

    const recurring = output?.map((item: any, index: number) => ({
      id: index + 1,
      date: item.day,
      active:
        pod && pod?.length !== 0
          ? pod?.some(
              (elm: any) =>
                elm.date === item.day && elm.sameAsStartDate === true,
            )
          : true,
      startDate:
        pod && pod?.length !== 0
          ? pod?.some(
              (elm: any) => elm.date === item.day && elm?.startDate === true,
            )
          : index === 0
          ? true
          : false,
      initalSlot:
        pod && pod?.length !== 0
          ? pod?.find((elm: any) => elm.date === item.day)?.visitTime
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
        startDate:
          proposalScheduleDate && proposalScheduleDate?.length !== 0
            ? proposalScheduleDate?.some(
                (elm: any) => elm.date === item && elm?.startDate === true,
              )
            : index === 0
            ? true
            : false,
        active:
          proposalRecurringDate && proposalScheduleDate?.length !== 0
            ? proposalScheduleDate?.some(
                (elm: any) => elm.date === item && elm.sameAsStartDate === true,
              )
            : true,
        initalSlot:
          proposalRecurringDate && proposalScheduleDate?.length !== 0
            ? proposalScheduleDate?.find((elm: any) => elm.date === item)
                ?.visitTime
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
  useMemo(() => {
    if (isRecurring) {
      const unMatched = newData?.filter((item: {date: string}) => {
        return !recurringModDatesRef?.some(
          (it: {date: string}) => item.date === it.date,
        );
      });
      if (recurringModDatesRef?.length > 0) {
        const sameData = unMatched?.map((item: any) => ({
          date: item.date,
          visitTime: recurringModDatesRef
            ? recurringModDatesRef[0].visitTime
            : [],
          sameAsStartDate: true,
        }));
        sameData?.length > 0 &&
          recurringModDatesRef?.length > 0 &&
          setValue('recurringModDates', [...recurringModDatesRef, ...sameData]);
      }
    } else if (!isRecurring) {
      const unMatched = newData?.filter((item: any) => {
        return !specificModDatesRef?.some(
          (it: {date: string}) => item.date === it.date,
        );
      });

      if (specificModDatesRef && specificModDatesRef?.length > 0) {
        const sameData = unMatched?.map((item: any) => ({
          date: item.date,
          visitTime: specificModDatesRef
            ? specificModDatesRef[0].visitTime
            : [],
          sameAsStartDate: true,
        }));

        sameData &&
          sameData?.length > 0 &&
          specificModDatesRef?.length > 0 &&
          setValue('specificModDates', [...specificModDatesRef, ...sameData]);
      }
    }
  }, [
    isRecurring,
    newData,
    recurringModDatesRef,
    setValue,
    specificModDatesRef,
  ]);
  return {isRecurring, handleMultipleCheck, newData};
};
