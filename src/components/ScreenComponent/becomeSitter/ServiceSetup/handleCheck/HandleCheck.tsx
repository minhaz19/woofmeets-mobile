import {useState} from 'react';

const useHandleMultipleActiveCheck = (data: any) => {
  const [newData, setData] = useState(data);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...data];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].value = !newArray[index]?.value;
    setData(newArray);
  };

  // const handlePetHostingActiveCheck = (typeId: number, optionsType: any) => {
  //   const updatedArray = optionsType.map((item: any) => {
  //     item.checked = item.id === typeId ? !item.checked : item.checked;
  //     return item;
  //   });
  //   const updatedActiveId = updatedArray
  //     .filter((item: any) => item.checked === true)
  //     .map((item: any) => item.id);
  //   setActivePetHosting({
  //     ...activePetHosting,
  //     items: updatedArray,
  //     activeItem: updatedActiveId,
  //   });
  // };

  return {
    handleMultipleCheck,
    newData,
  };
};

export default useHandleMultipleActiveCheck;
