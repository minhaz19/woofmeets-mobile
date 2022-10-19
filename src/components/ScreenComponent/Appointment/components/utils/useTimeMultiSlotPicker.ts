import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';

let Dates: any = [];
export const useTimeMultiSlotPicker = (singleItem: any, initalSlot: any) => {
  const {visitLength} = useWatch();

  const [newData, setDatas] = useState<any>([]);
  useMemo(() => {
    console.log('reloading day time slo');
    const times: any = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM
    console.log('ind lop', initalSlot);

    for (let i = 0; tt < 24 * 60; i++) {
      console.log('ind lop');
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
        active: initalSlot
          ? initalSlot?.some((it: string) => it === individualSlot)
          : false,
      }; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + visitLength;
    }
    setDatas(times);
  }, [initalSlot, visitLength]);

  console.log('calling');
  const handleMultipleCheck = (id: number) => {
    console.log('reloading day time slo');
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  if (initalSlot?.length > 0) {
    const matchIndex = Dates.findIndex(
      (itm: {date: string}) => itm.date === singleItem.date,
    );
    if (matchIndex === -1) {
      Dates.push({
        date: singleItem.date,
        visitTime: initalSlot,
        sameAsStartDate: false,
        startDate: singleItem.startDate,
      });
    }
  }
  console.log('Dates', Dates);
  return {handleMultipleCheck, newData};
};
