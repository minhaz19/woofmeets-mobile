import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';

export const useTimeMultiSlotPicker = (
  singleItem: any,
  initalSlot: any,
  isRecurring: boolean,
) => {
  const [Dates, setDates] = useState<any>([]);
  const [Days, setDays] = useState<any>([]);
  // let Dates: any = [];
  // let Days: any = [];
  const [newData, setDatas] = useState<any>([]);
  const {visitLength} = useWatch();
  console.log('visitLength', visitLength);
  useMemo(() => {
    const times: any = []; // time array
    let tt = 0; // start time
    const ap = [' AM', ' PM']; // AM-PM

    console.log('inside for time memo', Days);
    for (let i = 0; tt < 24 * 60; i++) {
      console.log('inside for mulit');

      const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      const mm = tt % 60; // getting minutes of the hour in 0-55 format
      const individualSlot =
        ('0' + (hh % 12)).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ap[Math.floor(hh / 12)];
      times[i] = {
        id: i + 1,
        slot: individualSlot,
        active:
          initalSlot?.length > 0
            ? initalSlot?.some((it: string) => it === individualSlot)
            : isRecurring && Days?.length > 0
            ? Days[0].visits?.some((it: string) => it === individualSlot)
            : !isRecurring && Dates?.length > 0
            ? Dates[0].visits?.some((it: string) => it === individualSlot)
            : false,
      }; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + visitLength;
    }
    setDatas(times);
  }, [Days, initalSlot, isRecurring, Dates, visitLength]);

  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  if (initalSlot?.length > 0) {
    if (isRecurring) {
      const matchIndex = Days.findIndex(
        (itm: {date: string}) => itm.date === singleItem.date,
      );
      if (matchIndex === -1) {
        setDays([
          ...Days,
          {
            date: singleItem.date,
            visits: singleItem.initalSlot,
          },
        ]);
        // Days.push({
        //   date: singleItem.date,
        //   visits: singleItem.initalSlot,
        // });
      }
    } else if (!isRecurring) {
      const matchIndex = Dates.findIndex(
        (itm: {date: string}) => itm.date === singleItem.date,
      );
      if (matchIndex === -1) {
        setDates([
          ...Dates,
          {
            date: singleItem.date,
            visits: singleItem.initalSlot,
          },
        ]);
        // Dates.push({
        //   date: singleItem.date,
        //   visits: singleItem.initalSlot,
        // });
      }
    }
  }
  return {handleMultipleCheck, newData, Dates, Days};
};
