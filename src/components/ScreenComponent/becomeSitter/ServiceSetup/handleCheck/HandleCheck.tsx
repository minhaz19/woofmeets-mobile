import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

export const useHandleMultipleActiveCheck = (data: any) => {
  const {getValues} = useFormContext();
  const {sat, sun, mon, tue, thu, wed, fri} = getValues();
  const [newData, setData] = useState(data);
  const handleMultipleCheck = (id: any) => {
    const newArray = [...data];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].value = !newArray[index].value;
    setData(newArray);
  };
  return {
    handleMultipleCheck,
    newData,
  };
};
