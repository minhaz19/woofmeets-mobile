import {useState, useCallback} from 'react';
import { useAppSelector } from '../../../../../store/store';
import {useAvailabilityUtils} from './useAvailabilityUtils';

const useServiceAvailability = (props: {
  service: any;
  serviceAvailabilityId: any,
  defaultValues: any;
  navigation: {navigate: (arg0: string, arg1: any) => void};
}) => {
  const availability = useAppSelector(state => state.availability);
  // * handle available days
  const [availableDays, setAvailableDays] = useState(
    availability.defaultValues.availableDays,
  );
  const [showAvailabilityError, setShowAvailabilityError] = useState(false);
  const [selectedDays, setSelectedDays] = useState<any>([]);

  const onSetAvailableDays = useCallback(
    dayName => {
      setAvailableDays({
        ...availableDays,
        [dayName]: !availableDays[dayName],
      });

      if (selectedDays.includes(dayName)) {
        setSelectedDays([...selectedDays.filter((day:any) => day !== dayName)]);
      } else {
        setSelectedDays([...selectedDays, dayName]);
      }

      if (showAvailabilityError) {
        setShowAvailabilityError(false);
      }
    },

    [availableDays, selectedDays, showAvailabilityError],
  );

  // * handle full time
  const [fullTime, setFullTime] = useState(availability.defaultValues.fullTime);
  const [showFullTimeError, setFullTimeError] = useState(false);

  const onSetFullTime = (option: any) => {
    setFullTime(option);
    if (showFullTimeError) {
      setFullTimeError(false);
    }
  };

  // * handle Potty Break
  const [pottyBreak, setPottyBreak] = useState(availability.defaultValues.pottyBreak);
  const [showpottyBreakError, setPottyBreakError] = useState(false);

  const onSetpottyBreak = useCallback(
    option => {
      setPottyBreak(option);

      if (showpottyBreakError) {
        setPottyBreakError(false);
      }
    },
    [showpottyBreakError],
  );

  // * on Save availabilty

  const setErrorsOnSave = useCallback(() => {
    // ? set errors, if any
    // ! availability day error
    if (!selectedDays.length) {
      setShowAvailabilityError(true);
    }
    // ! full time error
    if (!fullTime) {
      setFullTimeError(true);
    }
    // ! potty break error
    if (!pottyBreak) {
      setPottyBreakError(true);
    }
  }, [fullTime, pottyBreak, selectedDays]);

  // const { isLoading, mutate } = useMutation(
  //   ({ data, serviceAvailabilityId }) =>
  //     saveServiceAvailability(data, serviceAvailabilityId),
  //   {
  //     onSuccess() {
  //       router.push(`/provider-profile/services/${availability.slug}/pet-preference`);
  //     },
  //   }
  // )
  const {handlePost, isLoading} = useAvailabilityUtils(
    availability.serviceAvailabilityId,
    props.navigation,
  );
  const onSaveAvailability = () => {
    setErrorsOnSave();

    if (selectedDays && pottyBreak && fullTime) {
      const data = availability.serviceAvailabilityId
        ? availableDays
        : {
            ...availableDays,
            pottyBreak,
            fulltime: fullTime === 'Yes',
            providerServiceId: availability.service.providerServiceId,
          };

      handlePost(data);
    }
  };

  return {
    availability: {
      availableDaysOptions: ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'],
      availableDays,
      onSetAvailableDays,
    },
    fullTime: {
      options: ['Yes', 'No'],
      onSetFullTime,
      selectedFullTimeOption: fullTime,
    },
    pottyBreaks: {
      options: ['0 - 2 hours', '2 - 4 hours', '4 - 8 hours', '8+ hours'],
      onSetpottyBreak,
      selectedPottyBreakOption: pottyBreak,
    },
    errors: {
      showAvailabilityError,
      showFullTimeError,
      showpottyBreakError,
    },
    onSaveAvailability,
    isLoading,
  };
};

export default useServiceAvailability;
