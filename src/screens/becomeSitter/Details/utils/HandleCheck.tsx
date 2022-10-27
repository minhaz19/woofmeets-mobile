import {useState} from 'react';
import { useFormContext } from 'react-hook-form';

export const useHandleMultipleActiveCheck = (data: any) => {
  const {
    setValue,
    formState: {errors},
  } = useFormContext();
  const newArray1 = [];
  for(const key in data) {
    newArray1.push({
      id: data[key].id,
      slug: data[key].slug,
      title: data[key].title,
      active: false,
    })
  }
  const [newData, setData] = useState(newArray1);

  const handleMultipleCheck = (id: any) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setData(newArray);
    setValue('skills', newData);
  };
  return {
    handleMultipleCheck,
    newData,
  };
};
