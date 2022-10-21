import {useEffect, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

let modData: any = [];
export const useDayTimeSlot = () => {
  const {setValue} = useFormContext();
  // const {DIVSpecificDate} = getValues();
  const {
    recurringSelectedDay,
    specificModDatesRef,
    recurringModDatesRef,
    isRecurring,
    repeatDate,
    multiDate,
    proposalOtherDate,
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
        pod.length !== 0
          ? pod.some(
              (elm: any) =>
                elm.date === item.day && elm.sameAsStartDate === true,
            )
          : true,
      startDate:
        pod.length !== 0
          ? pod.some(
              (elm: any) => elm.date === item.day && elm?.startDate === true,
            )
          : index === 0
          ? true
          : false,
      initalSlot:
        pod.length !== 0
          ? pod?.find((elm: any) => elm.date === item.day)?.visitTime
          : [],
    }));
    return recurring;
  };
  useEffect(() => {
    if (isRecurring) {
      const recurring = getRecurringDays(
        repeatDate,
        recurringSelectedDay,
        proposalOtherDate,
      );
      console.log(
        'repease ',
        repeatDate,
        recurringSelectedDay,
        proposalOtherDate,
      );
      setDatas(recurring);
    } else if (!isRecurring) {
      const multi = multiDate?.map((item: any, index: number) => ({
        id: index + 1,
        date: item,
        startDate:
          proposalOtherDate.length !== 0
            ? proposalOtherDate.some(
                (elm: any) => elm.date === item.day && elm?.startDate === true,
              )
            : index === 0
            ? true
            : false,
        active:
          proposalOtherDate.length !== 0
            ? proposalOtherDate.some(
                (elm: any) => elm.date === item && elm.sameAsStartDate === true,
              )
            : true,
        initalSlot:
          proposalOtherDate.length !== 0
            ? proposalOtherDate?.find((elm: any) => elm.date === item)
                ?.visitTime
            : [],
      }));
      setDatas(multi);
    }
  }, [
    isRecurring,
    repeatDate,
    recurringSelectedDay,
    multiDate,
    proposalOtherDate,
  ]);
  useEffect(() => {
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
