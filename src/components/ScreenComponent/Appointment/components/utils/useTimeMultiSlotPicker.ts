import {useWatch} from 'react-hook-form';
let Dates: any = [];
let Days: any = [];
let timesArray: any = [];
let ttO = 0; // start time
const apO = [' AM', ' PM']; // AM-PM
for (let i = 0; ttO < 24 * 60; i++) {
  const hh = Math.floor(ttO / 60); // gettOing hours of day in 0-24 format
  const mm = ttO % 60; // gettOing minutes of the hour in 0-55 format
  const singleSlot =
    ('0' + (hh % 12)).slice(-2) +
    ':' +
    ('0' + mm).slice(-2) +
    apO[Math.floor(hh / 12)];
  timesArray.push(singleSlot);
  ttO = ttO + 30;
}
export const useTimeMultiSlotPicker = (singleItem: any, visits: any) => {
  const {visitLength, recurringModDates, specificModDates} = useWatch();
  Days = [...recurringModDates];
  Dates = [...specificModDates];
  let times: any = [];
  // console.log('timesArray', timesArray);
  const modSorted = timesArray
    .map((item: any) => item.slot)
    .map(
      (_: any, i: number) =>
        timesArray[
          timesArray.indexOf(visits[i]) +
            (timesArray.indexOf(visits[i]) !== -1 ? 1 : 0)
        ],
    )
    .filter((element: any) => element !== undefined);
  // let tt = 0; // start time
  // const ap = [' AM', ' PM']; // AM-PM
  // for (let i = 0; tt < 24 * 60; i++) {
  //   const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  //   const mm = tt % 60; // getting minutes of the hour in 0-55 format
  //   const individualSlot =
  //     ('0' + (hh % 12)).slice(-2) +
  //     ':' +
  //     ('0' + mm).slice(-2) +
  //     ap[Math.floor(hh / 12)];

  //   times[i] = {
  //     id: i + 1,
  //     slot: individualSlot,

  //     active:
  //       visits?.length > 0
  //         ? visits?.findIndex((it: string) => it === individualSlot) !== -1
  //         : false,
  //     disable: modSorted.indexOf(individualSlot) !== -1,
  //   };
  //   tt = tt + 30;
  // }

  timesArray.map((individualSlot: string, i: number) => {
    times[i] = {
      id: i + 1,
      slot: individualSlot,

      active:
        visits?.length > 0
          ? visits?.findIndex((it: string) => it === individualSlot) !== -1
          : false,
      disable:
        visitLength === 60 && modSorted?.length > 0
          ? modSorted.indexOf(individualSlot) !== -1
          : false,
    };
  });

  const handleMultipleCheck = (id: number) => {
    const newArray = [...times];
    const index = newArray.findIndex(item => item.id === id);
    if (visitLength === 60) {
      newArray[index].active = !newArray[index].active;
      newArray[index + 1].disable = !newArray[index + 1].disable;
    } else {
      newArray[index].active = !newArray[index].active;
    }
    times = [...newArray];
  };

  return {handleMultipleCheck, times, Dates, Days};
};
