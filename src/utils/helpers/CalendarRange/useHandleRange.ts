import moment from 'moment';
import {useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {setCross} from '../../../store/slices/misc/hittingCross';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {compareDate} from './compareDate';

export const useHandleRange = (name = 'dateRange') => {
  const [step, setSteps] = useState(1);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const {setValue} = useFormContext();
  const cross = useAppSelector((state: any) => state.cross.cross);
  const dispatch = useAppDispatch();
  const handleDayPress = (day: any) => {
    const {end} = compareDate(day.dateString, step, setPrevDate);

    // if (step === 1) {
    //   setStartingDate(day.dateString);
    //   setSteps(2);
    // } else if (step === 2) {
    //   setEndingDate(day.dateString);
    // }

    if (step === 1) {
      setSteps(2);
      setStartingDate(day.dateString);
    } else if (step === 2) {
      setEndingDate(day.dateString);

      if (prevDate !== undefined) {
        if (prevDate < end) {
          setEndingDate(day.dateString);
        } else if (prevDate > end) {
          setStartingDate(day.dateString);
          setEndingDate(startingDate);
        }
      }
    }
  };
  const resetRange = () => {
    setStartingDate('');
    setEndingDate('');
    setSteps(1);
  };

  useMemo(() => {
    if (startingDate !== '' && endingDate !== '' && cross === false) {
      setValue(
        name,
        `${moment(startingDate).format('MMMM D, YYYY')} - ${moment(
          endingDate,
        ).format('MMMM D, YYYY')}`,
      );
    } else if (cross === true) {
      setSteps(1);
      setStartingDate('');
      setEndingDate('');
      setValue(name, '');
      dispatch(setCross(false));
    }
  }, [startingDate, endingDate, cross, setValue, name, dispatch]);
  return {startingDate, endingDate, resetRange, handleDayPress};
};
