import {FormikValues, useFormikContext} from 'formik';
import moment from 'moment';
import {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setCross} from '../../../store/slices/hittingCross';
import {compareDate} from './compareDate';

export const useHandleRange = () => {
  const [step, setSteps] = useState(1);
  const [prevDate, setPrevDate] = useState<false | undefined | Date>();
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const {setFieldValue} = useFormikContext<FormikValues>();
  const cross = useSelector((state: any) => state.cross.cross);
  const dispatch = useDispatch();
  const handleDayPress = (day: any) => {
    const {end} = compareDate(day.dateString, step, setPrevDate);

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

  useMemo(() => {
    if (startingDate !== '' && endingDate !== '' && cross === false) {
      setFieldValue(
        'dateRange',
        `${moment(startingDate).format('MMMM d, YYYY')} - ${moment(
          endingDate,
        ).format('MMMM d, YYYY')}`,
      );
    } else if (cross === true) {
      setSteps(1);
      setStartingDate('');
      setEndingDate('');
      setFieldValue('dateRange', '');
      dispatch(setCross(false));
    }
  }, [startingDate, endingDate, setFieldValue, cross, dispatch]);
  return {startingDate, endingDate, handleDayPress};
};
