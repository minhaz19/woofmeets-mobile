import {useState} from 'react';

export const useHandleMultiCheck = (datas: any) => {
  const [newData, setDatas] = useState(datas);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...datas];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index]?.active;
    setDatas(newArray);
  };
  return {newData, handleMultipleCheck};
};
