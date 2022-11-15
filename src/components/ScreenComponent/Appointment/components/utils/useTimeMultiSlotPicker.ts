// import {useMemo} from 'react';
import {useWatch} from 'react-hook-form';
let Dates: any = [];
let Days: any = [];
export const useTimeMultiSlotPicker = (
  singleItem: any,
  visits: any,
  // isRecurring: boolean,
) => {
  const {visitLength, recurringModDates, specificModDates} = useWatch();
  Days = [...recurringModDates];
  Dates = [...specificModDates];
  // useMemo(() => {
  let times: any = []; // time array
  let tt = 0; // start time
  const ap = [' AM', ' PM']; // AM-PM
  for (let i = 0; tt < 24 * 60; i++) {
    // console.log('vis', singleItem, visits);
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = tt % 60; // getting minutes of the hour in 0-55 format
    const individualSlot =
      ('0' + (hh % 12)).slice(-2) +
      ':' +
      ('0' + mm).slice(-2) +
      ap[Math.floor(hh / 12)];
    // console.log(
    //   'vis',
    //   singleItem,
    //   visits?.findIndex((it: string) => it === individualSlot) !== -1,
    // );
    times[i] = {
      id: i + 1,
      slot: individualSlot,
      active:
        visits?.length > 0
          ? visits?.findIndex((it: string) => it === individualSlot) !== -1
          : // : isRecurring && Days?.length > 0
            // ? Days[0].visits?.some((it: string) => it === individualSlot)
            // : !isRecurring && Dates?.length > 0
            // ? Dates[0].visits?.some((it: string) => it === individualSlot)
            false,
    }; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt = tt + visitLength;
  }
  // const [newData, setDatas] = useState<any>(times);
  //   setDatas(times);
  // }, [visitLength]);

  const handleMultipleCheck = (id: number) => {
    const newArray = [...times];
    const index = newArray.findIndex(item => item.id === id);

    newArray[index].active = !newArray[index].active;
    // setDatas(newArray);
    times = newArray;
  };

  // useMemo(() => {
  //   if (isRecurring) {
  //     const matchIndex = Days.findIndex(
  //       (itm: {date: string}) => itm.date === singleItem.date,
  //     );
  //     if (matchIndex === -1) {
  //       Days.push(singleItem);
  //     } else {
  //       var newDays = [];
  //       newDays.push(singleItem);
  //       Days = newDays;
  //     }
  //   } else {
  //     const matchIndex = Dates.findIndex(
  //       (itm: {date: string}) => itm.date === singleItem.date,
  //     );
  //     if (matchIndex === -1) {
  //       Dates.push(singleItem);
  //     } else {
  //       var newDates = [];
  //       newDates.push(singleItem);
  //       Dates = newDates;
  //     }
  //   }
  // }, [isRecurring, singleItem]);
  return {handleMultipleCheck, times, Dates, Days};
};
