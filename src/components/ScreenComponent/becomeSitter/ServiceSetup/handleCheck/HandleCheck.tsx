import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

export const useHandleMultipleActiveCheck = () => {
  const {getValues, setValue} = useFormContext();
  const defaultValues = getValues();

  // * handle available days
  const [availableDays, setAvailableDays] = useState(defaultValues?.selectDay);
  const [selectedDays, setSelectedDays] = useState<any>([]);

  useEffect(() => {
    if (defaultValues?.selectDay) {
      setSelectedDays([
        ...Object.keys(defaultValues?.selectDay).filter(k => {
          return defaultValues?.selectDay[k];
        }),
      ]);
    }
  }, []);

  const onSetAvailableDays = (dayName: string | number) => {
    setAvailableDays({
      ...availableDays,
      [dayName]: !availableDays[dayName],
    });
    setValue(
      'selectDay',
      {
        ...availableDays,
        [dayName]: !availableDays[dayName],
      },
      {shouldValidate: true},
    );
    if (selectedDays.includes(dayName)) {
      setSelectedDays([...selectedDays.filter(day => day !== dayName)]);
    } else {
      setSelectedDays([...selectedDays, dayName]);
    }
  };
  return {
    availability: {
      availableDaysOptions: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'],
      availableDays,
      onSetAvailableDays,
    },
  };
};
