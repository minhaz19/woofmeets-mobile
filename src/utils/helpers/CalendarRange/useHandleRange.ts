/* eslint-disable @typescript-eslint/no-unused-vars */

import {useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Colors from '../../../constants/Colors';
import {_dateRange} from '../datesArray';
import {compareDate} from './compareDate';
import {orderAndStyleRange} from './orderAndStyleRange';

export const useHandleRange = (
  type: string,
  setValue?: (arg: string, arg2: any) => void,
) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  const [preMarked, setPremarked] = useState({});
  const [singleSelect, setSingleSelect] = useState<string>('');
  const [step, setSteps] = useState(1);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [multiDate, setMultiDate] = useState<any>([]);
  const {getValues} = useFormContext();
  const {selectedDate, selectedRange, multiDate: selectMultiDate} = getValues();
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
  useMemo(() => {
    if (type === 'RANGE') {
      const range = _dateRange(startingDate, endingDate);
      const {styledMarkedRange, orderRange} = orderAndStyleRange(
        range,
        'RANGE',
      );

      setMarkedStyle(styledMarkedRange);
      range && setDateRange(orderRange);
      setValue && setValue('proposalStartDate', startingDate);
      setValue && setValue('proposalEndDate', endingDate);
      setValue && setValue('selectedRange', orderRange);
    }
  }, [endingDate, setValue, startingDate, type]);

  useMemo(() => {
    let preStyledMarkedRange: any = {};
    if (type === 'RANGE') {
      console.log('selectedRange', selectedRange);
      const preStyled =
        selectedRange.length !== 0 &&
        selectedRange?.map((_: string, i: number) => ({
          [selectedRange[i]]: {
            customStyles: {
              container: {
                backgroundColor: Colors.primary,
                elevation: 2,
                borderRadius: 0,
                borderBottomLeftRadius: i === 0 ? 30 : 0,
                borderTopLeftRadius: i === 0 ? 30 : 0,
                borderBottomRightRadius:
                  i === selectedRange.length - 1 ? 30 : 0,
                borderTopRightRadius: i === selectedRange.length - 1 ? 30 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              },
              text: {
                color: 'white',
              },
            },
          },
        }));
      const modSelDates =
        preStyled &&
        preStyled?.map(
          (item: any) =>
            // @ts-ignore
            (preStyledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
        );
      modSelDates && setPremarked(preStyledMarkedRange);
    } else if (type === 'MULTI') {
      const styledRange =
        selectMultiDate.length !== 0 &&
        selectMultiDate?.map((_: string, i: number) => ({
          [selectMultiDate[i]]: {
            customStyles: {
              container: {
                backgroundColor: Colors.primary,
                elevation: 2,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              text: {
                color: 'white',
              },
            },
          },
        }));
      const modSelDates =
        styledRange &&
        styledRange?.map(
          (item: any) =>
            // @ts-ignore
            (preStyledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
        );
      modSelDates && setPremarked(preStyledMarkedRange);
    }
  }, [selectMultiDate, selectedRange, type]);
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
    preMarked,
    singleSelect,
    startingDate,
    endingDate,
    dateRange,
    reset,
  };
};
