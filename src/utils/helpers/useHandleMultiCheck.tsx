import {useState} from 'react';
import {useFormContext} from 'react-hook-form';

export const useHandleMultiCheck = (datas: any) => {
  const {getValues} = useFormContext();
  const {pill, injection, topical} = getValues();
  const [newData, setDatas] = useState(datas);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...datas];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active =
      index === 0
        ? !pill
        : index === 1
        ? !topical
        : index === 2
        ? !injection
        : null;
    setDatas(newArray);
  };
  return {newData, handleMultipleCheck};
};
