/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useState} from 'react';
import {_dateRange} from '../datesArray';
import {compareDate} from './compareDate';
import {orderAndStyleRange} from './orderAndStyleRange';

export const useHandleRange = (type: string) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  const [singleSelect, setSingleSelect] = useState<string>('');
  const [step, setSteps] = useState(1);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const handleDayPress = (date: any) => {
    if (type === 'SINGLE') {
      setSingleSelect(date.dateString);
    } else if (type === 'MULTI') {
      const {styledMarkedRange} = orderAndStyleRange(date, 'MULTI');
      setMarkedStyle({..._markedStyle, ...styledMarkedRange});
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
  useMemo(() => {
    if (type === 'RANGE') {
      const range = _dateRange(startingDate, endingDate);
      const {styledMarkedRange} = orderAndStyleRange(range, 'RANGE');
      setMarkedStyle(styledMarkedRange);
    }
  }, [endingDate, startingDate]);
  return {handleDayPress, _markedStyle, singleSelect};
};
