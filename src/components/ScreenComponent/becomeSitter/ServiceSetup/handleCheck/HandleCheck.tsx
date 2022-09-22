import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

export const useHandleMultipleActiveCheck = (data: any) => {
  const {getValues} = useFormContext();
  const {sat, sun, mon, tue, thu, wed, fri} = getValues();
  const [newData, setData] = useState(data);
  const handleMultipleCheck = (id: any) => {
    const newArray = [...data];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].value =
      index === 0
        ? !sat
        : index === 1
        ? !sun
        : index === 2
        ? !mon
        : index === 3
        ? !tue
        : index === 4
        ? !wed
        : index === 5
        ? !thu
        : index === 6
        ? !fri
        : null;
    setData(newArray);
  };
  return {
    handleMultipleCheck,
    newData,
  };
};
