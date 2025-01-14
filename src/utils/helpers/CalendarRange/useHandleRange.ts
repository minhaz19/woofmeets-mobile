/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useWatch} from 'react-hook-form';
import {_dateRange} from '../datesArray';
import {compareDate} from './compareDate';
import {orderAndStyleRange} from './orderAndStyleRange';
let orderMultiDates: any = [];
export const useHandleRange = (
  type: string,
  setValue?: (arg: string, arg2: any) => void,
  selectColor?: string,
) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  const {
    proposalStartDate,
    proposalEndDate,
    recurringStartDate,
    specificModDates,
    multiDate: rr,
  } = useWatch();
  const [step, setSteps] = useState(1);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [multiDate, setMultiDate] = useState<any>([]);
  const [singleSelect, setSingleSelect] = useState<string>(recurringStartDate);
  const [startingDate, setStartingDate] = useState(proposalStartDate);
  const [endingDate, setEndingDate] = useState(proposalEndDate);

  useEffect(() => {
    if (type === 'MULTI') {
      orderMultiDates = [...rr];
      const {styledMarkedRange} = orderAndStyleRange([...rr], 'MULTI');
      setMarkedStyle(styledMarkedRange);
    }
  }, []);
  const handleDayPress = (date: any) => {
    if (type === 'SINGLE') {
      setSingleSelect(date.dateString);
      setValue && setValue('recurringStartDate', date.dateString);
    } else if (type === 'MULTI') {
      const matchIndex = orderMultiDates?.indexOf(date.dateString);
      if (matchIndex === -1) {
        orderMultiDates.push(date.dateString);
      } else {
        orderMultiDates.splice(matchIndex, 1);
        const updatedRMD = specificModDates?.filter(
          (it: any) => it.date !== date.dateString,
        );
        setValue && setValue('specificModDates', updatedRMD);
      }
      const {styledMarkedRange} = orderAndStyleRange(orderMultiDates, 'MULTI');

      setMarkedStyle(styledMarkedRange);

      const sortedDates = orderMultiDates.sort(
        (a: string, b: string) => Date.parse(a) - Date.parse(b),
      );
      setMultiDate([...multiDate, date.dateString]);
      setValue && setValue('multiDate', sortedDates);
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
  useEffect(() => {
    if (type === 'RANGE') {
      const range = _dateRange(startingDate, endingDate);
      const {styledMarkedRange, orderRange} = orderAndStyleRange(
        range,
        'RANGE',
        selectColor,
      );
      setMarkedStyle(styledMarkedRange);
      // dispatch(storeMarkStyle(styledMarkedRange));
      range && setDateRange(orderRange);
      setValue && setValue('markedStyle', styledMarkedRange);
      setValue && setValue('proposalStartDate', startingDate);
      setValue && setValue('proposalEndDate', endingDate);
      setValue &&
        setValue(
          'proposalEndDate',
          endingDate === '' ? startingDate : endingDate,
        );
      // setValue && setValue('selectedRange', orderRange);
    }
  }, [endingDate, startingDate, type]);

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
  const resetSelection = () => {
    setStartingDate('');
    setEndingDate('');
    setSingleSelect('');
    setMarkedStyle({});
    setSteps(1);
  };
  return {
    handleDayPress,
    _markedStyle,
    singleSelect,
    startingDate,
    endingDate,
    dateRange,
    reset,
    resetSelection,
    setMarkedStyle,
  };
};
