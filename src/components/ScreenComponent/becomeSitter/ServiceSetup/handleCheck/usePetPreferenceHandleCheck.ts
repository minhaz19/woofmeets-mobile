import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

export const usePetPreferenceHandleCheck = (data: any, contextValue: any) => {
  const {smallDog, mediumDog, largeDog, giantDog, cat} = contextValue;
  const [newData, setData] = useState(data);
  const handleMultipleCheck = (id: any) => {
    const newArray = [...data];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].value =
      index === 0
        ? !smallDog
        : index === 1
        ? !mediumDog
        : index === 2
        ? !largeDog
        : index === 3
        ? !giantDog
        : index === 4
        ? !cat
        : null;
    setData(newArray);
  };
  return {
    handleMultipleCheck,
    newData,
  };
};

export const usePetPreferenceHandle = () => {
  const {getValues, setValue} = useFormContext();
  const defaultValues = getValues();
  // * handle available Preference
  const [preference, setPreference] = useState(defaultValues.preference);
  const [selectedPreference, setSelectedPreference] = useState<any>([]);

  useEffect(() => {
    if (defaultValues.preference) {
      setSelectedPreference([
        ...Object.keys(defaultValues.preference).filter(k => {
          return defaultValues.preference[k];
        }),
      ]);
    }
  }, []);

  const onSetPreference = (preferenceName: string | number) => {
    setPreference({
      ...preference,
      [preferenceName]: !preference[preferenceName],
    });
    setValue(
      'preference',
      {
        ...preference,
        [preferenceName]: !preference[preferenceName],
      },
      {shouldValidate: true},
    );
    if (selectedPreference.includes(preferenceName)) {
      setSelectedPreference([
        ...selectedPreference.filter(
          (p: string | number) => p !== preferenceName,
        ),
      ]);
    } else {
      setSelectedPreference([...selectedPreference, preferenceName]);
    }
  };
  return {
    preferences: {
      preferenceOptions: [
        {id: 36, type: 'Small dog ( 0-15 Lbs )', name: 'smallDog', value: null},
        {
          id: 37,
          type: 'Medium dog ( 16 - 40 Lbs )',
          name: 'mediumDog',
          value: null,
        },
        {
          id: 38,
          type: 'Large dog ( 41 - 100 Lbs )',
          name: 'largeDog',
          value: null,
        },
        {id: 39, type: 'Giant dog ( 100+ Lbs )', name: 'giantDog', value: null},
        {id: 40, type: 'Cat', name: 'cat', value: null},
      ],
      preference,
      onSetPreference,
    },
  };
};
