import {useState} from 'react';

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
