import {useState} from 'react';

const useHandleMultipleActiveCheck = () => {
  const [activePetHosting, setActivePetHosting] = useState<any>({});
  const [activePetOwnerExpectation, setActivePetOwnerExpectation] =
    useState<any>({});
  const [selectDays, setSelectDays] = useState<any>({});

  const handlePetHostingActiveCheck = (typeId: number, optionsType: any) => {
    const updatedArray = optionsType.map((item: any) => {
      item.checked = item.id === typeId ? !item.checked : item.checked;
      return item;
    });

    setActivePetHosting({
      ...activePetHosting,
      items: updatedArray,
    });
  };
  const handlePetOwnerExpectationActiveCheck = (
    typeId: number,
    optionsType: any,
  ) => {
    const updatedArray = optionsType.map((item: any) => {
      item.checked = item.id === typeId ? !item.checked : item.checked;
      return item;
    });
    setActivePetOwnerExpectation({
      ...activePetOwnerExpectation,
      items: updatedArray,
    });
  };

  const handleSelectDaysActiveCheck = (typeId: number, optionsType: any) => {
    const updatedArray = optionsType.map((item: any) => {
      item.checked = item.id === typeId ? !item.checked : item.checked;
      return item;
    });
    setSelectDays({
      ...selectDays,
      items: updatedArray,
    });
  };

  return {
    activePetHosting,
    activePetOwnerExpectation,
    selectDays,
    handlePetHostingActiveCheck,
    handlePetOwnerExpectationActiveCheck,
    handleSelectDaysActiveCheck,
  };
};

export default useHandleMultipleActiveCheck;
