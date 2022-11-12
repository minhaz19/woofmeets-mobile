import {useEffect, useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';
let Dates: any = [];
let Days: any = [];
export const useTimeMultiSlotPicker = (
  singleItem: any,
  visits: any,
  isRecurring: boolean,
) => {
  const [newData, setDatas] = useState<any>([]);
  const {visitLength} = useWatch();
  useMemo(() => {
    const times: any = []; // time array
    let tt = 0; // start time
    const ap = [' AM', ' PM']; // AM-PM
    for (let i = 0; tt < 24 * 60; i++) {
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
          visits?.length > 0
            ? visits?.some((it: string) => it === individualSlot)
            : // : isRecurring && Days?.length > 0
              // ? Days[0].visits?.some((it: string) => it === individualSlot)
              // : !isRecurring && Dates?.length > 0
              // ? Dates[0].visits?.some((it: string) => it === individualSlot)
              false,
      }; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + visitLength;
    }
    setDatas(times);
  }, [visitLength, visits]);

  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);

    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };

  useMemo(() => {
    if (isRecurring) {
      const matchIndex = Days.findIndex(
        (itm: {date: string}) => itm.date === singleItem.date,
      );
      if (matchIndex === -1) {
        Days.push(singleItem);
      } else {
        var newDays = [];
        newDays.push(singleItem);
        Days = newDays;
      }
    } else {
      const matchIndex = Dates.findIndex(
        (itm: {date: string}) => itm.date === singleItem.date,
      );
      if (matchIndex === -1) {
        Dates.push(singleItem);
      } else {
        var newDates = [];
        newDates.push(singleItem);
        Dates = newDates;
      }
    }
  }, [isRecurring, singleItem]);

  return {handleMultipleCheck, newData, Dates, Days};
};
