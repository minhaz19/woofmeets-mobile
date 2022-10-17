import {useEffect,  useState} from 'react';
// import {useFormContext} from 'react-hook-form';
// import Colors from '../../../constants/Colors';
// import {storeMarkStyle} from '../../../store/slices/misc/markedStyle';
// import {useAppDispatch} from '../../../store/store';
import {_dateRange} from '../datesArray';
import {compareDate} from './compareDate';
import {orderAndStyleRange} from './orderAndStyleRange';

export const useHandleRange = (
  type: string,
  setValue?: (arg: string, arg2: any) => void,
) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  // const [preMarked, setPremarked] = useState({});
  const [singleSelect, setSingleSelect] = useState<string>('');
  const [step, setSteps] = useState(1);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [multiDate, setMultiDate] = useState<any>([]);
  // const {getValues} = useFormContext();
  // const {
  //   selectedDate,
  //   selectedRange,
  //   multiDate: selectMultiDate,
  //   proposalStartDate,
  //   proposalEndDate,
  // } = getValues();
  // const dispatch = useAppDispatch();
  const handleDayPress = (date: any) => {
    if (type === 'SINGLE') {
      setSingleSelect(date.dateString);
      setValue && setValue('recurringStartDate', date.dateString);
    } else if (type === 'MULTI') {
      const {styledMarkedRange, orderMultiDates} = orderAndStyleRange(
        date,
        'MULTI',
      );

      setMarkedStyle(styledMarkedRange);
      setMultiDate([...multiDate, date.dateString]);
      setValue && setValue('multiDate', orderMultiDates);
    } else if (type === 'RANGE') {
      const {end} = compareDate(date.dateString, step, setPrevDate);

      if (step === 1) {
        setSteps(2);
        setStartingDate(date.dateString);
        setSingleSelect(date.dateString);
      } else if (prevDate !== undefined) {
        if (step === 2 && prevDate < end) {
          setEndingDate(date.dateString);
          setSingleSelect('');
          setSteps(2);

          if (
            startingDate === date.dateString ||
            endingDate === date.dateString
          ) {
            setSteps(1);
            setStartingDate('');
            setEndingDate('');
            setValue && setValue('selectedRange', []);
          }
        } else if (step === 2 && prevDate > end) {
          setEndingDate('');
          setStartingDate(date.dateString);
          setSingleSelect(date.dateString);
          compareDate(date.dateString, 1, setPrevDate);
        }
      }
    }
  };
  console.log('calendar reloading');
  useEffect(() => {
    console.log('caliing range');
    if (type === 'RANGE') {
      const range = _dateRange(startingDate, endingDate);
      const {styledMarkedRange, orderRange} = orderAndStyleRange(
        range,
        'RANGE',
      );
      console.log('inside', styledMarkedRange);
      setMarkedStyle(styledMarkedRange);
      // dispatch(storeMarkStyle(styledMarkedRange));
      range && setDateRange(orderRange);
      setValue && setValue('markedStyle', styledMarkedRange);
      setValue && setValue('proposalStartDate', startingDate);
      setValue && setValue('proposalEndDate', endingDate);
      setValue && setValue('selectedRange', orderRange);
    }
  }, [endingDate, setValue, startingDate, type]);
  // useEffect(() => {
  //   // const range = _dateRange(startingDate, endingDate);
  //   console.log('proposalEndDate', proposalEndDate);
  //   // const {styledMarkedRange} = orderAndStyleRange(selectedRange, 'RANGE');
  //   // console.log('rr', selectedRange);

  //   // setMarkedStyle(styledMarkedRange);
  // }, [proposalEndDate]);

  console.log('code m', _markedStyle);
  const reset = () => {
    setStartingDate('');
    setEndingDate('');
    setDateRange([]);
    setSingleSelect('');
    setMultiDate([]);
    setMarkedStyle({});
    setSteps(1);
    setValue && setValue('proposalStartDate', '');
    setValue && setValue('proposalEndDate', '');
    setValue && setValue('multiDate', []);
  };
  return {
    handleDayPress,
    _markedStyle,
    singleSelect,
    startingDate,
    endingDate,
    dateRange,
    reset,
  };
};

// useMemo(() => {
//   let preStyledMarkedRange: any = {};
//   let preOrderRange: any = [];
//   if (type === 'RANGE') {
//     console.log('selectedRange', selectedRange);
//     const unorderedRange =
//       selectedRange &&
//       selectedRange?.map(
//         (date: string | number | Date) =>
//           new Date(date).getFullYear() +
//           '-' +
//           // @ts-ignore
//           parseInt(new Date(date).getMonth() + 1) +
//           '-' +
//           new Date(date).getDate(),
//       );
//     unorderedRange &&
//       unorderedRange.map((or: string) =>
//         preOrderRange.push(
//           or
//             .split('-')
//             .map((p: string) => (parseInt(p) <= 9 ? '0' + p : p))
//             .join('-'),
//         ),
//       );
//     const preStyled =
//       preOrderRange.length !== 0 &&
//       preOrderRange?.map((_: string, i: number) => ({
//         [preOrderRange[i]]: {
//           customStyles: {
//             container: {
//               backgroundColor: Colors.primary,
//               elevation: 2,
//               borderRadius: 0,
//               borderBottomLeftRadius: i === 0 ? 30 : 0,
//               borderTopLeftRadius: i === 0 ? 30 : 0,
//               borderBottomRightRadius:
//                 i === preOrderRange.length - 1 ? 30 : 0,
//               borderTopRightRadius: i === preOrderRange.length - 1 ? 30 : 0,
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//             },
//             text: {
//               color: 'white',
//             },
//           },
//         },
//       }));
//     const modSelDates =
//       preStyled &&
//       preStyled?.map(
//         (item: any) =>
//           // @ts-ignore
//           (preStyledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
//       );
//     modSelDates && setPremarked(preStyledMarkedRange);
//   } else if (type === 'MULTI') {
//     const styledRange =
//       selectMultiDate.length !== 0 &&
//       selectMultiDate?.map((_: string, i: number) => ({
//         [selectMultiDate[i]]: {
//           customStyles: {
//             container: {
//               backgroundColor: Colors.primary,
//               elevation: 2,
//               borderRadius: 10,
//               justifyContent: 'center',
//               alignItems: 'center',
//             },
//             text: {
//               color: 'white',
//             },
//           },
//         },
//       }));
//     const modSelDates =
//       styledRange &&
//       styledRange?.map(
//         (item: any) =>
//           // @ts-ignore
//           (preStyledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
//       );
//     modSelDates && setPremarked(preStyledMarkedRange);
//   }
// }, [selectMultiDate, selectedRange, type]);
