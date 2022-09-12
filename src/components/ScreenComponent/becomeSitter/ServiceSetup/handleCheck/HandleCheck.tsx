import {useState} from 'react';

const useHandleMultipleActiveCheck = (data: any) => {
  const [newData, setData] = useState(data);
  const handleMultipleCheck = (id: number) => {
    console.log(id);
    const newArray = [...data];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].value = !newArray[index]?.value;
    setData(newArray);
  };

  // const [activePetHosting, setActivePetHosting] = useState<any>({});
  // // const [activePetOwnerExpectation, setActivePetOwnerExpectation] =
  // //   useState<any>({});
  // // const [selectDays, setSelectDays] = useState<any>({});

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

  // // const handlePetOwnerExpectationActiveCheck = (
  //   typeId: number,
  //   optionsType: any,
  // ) => {
  //   const updatedArray = optionsType.map((item: any) => {
  //     item.checked = item.id === typeId ? !item.checked : item.checked;
  //     return item;
  //   });
  //   setActivePetOwnerExpectation({
  //     ...activePetOwnerExpectation,
  //     items: updatedArray,
  //   });
  // };

  // const handleSelectDaysActiveCheck = (typeId: number, optionsType: any) => {
  //   const updatedArray = optionsType.map((item: any) => {
  //     item.checked = item.id === typeId ? !item.checked : item.checked;
  //     return item;
  //   });
  //   setSelectDays({
  //     ...selectDays,
  //     items: updatedArray,
  //   });
  // };

  // // filter active check in activePetHosting if activePetHosting is not undefined
  // const handleActivePetHostingActiveCheck = () => {
  //   if (activePetHosting.items) {
  //     return activePetHosting.items
  //       .filter((item: any) => item.checked === true)
  //       .map((item: any) => item.id);
  //   }
  //   return [];
  // };
  // // console.log(
  // //   'handleActivePetHostingActiveCheck()',
  // //   handleActivePetHostingActiveCheck(),
  // // );

  // const handleActivePetOwnerExpectationActiveCheck = () => {
  //   if (activePetOwnerExpectation.items) {
  //     return activePetOwnerExpectation.items
  //       .filter((item: any) => item.checked === true)
  //       .map((item: any) => item.id);
  //   }
  //   return [];
  // };
  // const handleActiveSelectDaysActiveCheck = () => {
  //   if (selectDays.items) {
  //     return selectDays.items
  //       .filter((item: any) => item.checked === true)
  //       .map((item: any) => item.id);
  //   }
  //   return [];
  // };

  return {
    handleMultipleCheck,
    newData,
    // activePetHosting,
    // activePetOwnerExpectation,
    // selectDays,
    // handlePetHostingActiveCheck,
    // handlePetOwnerExpectationActiveCheck,
    // handleSelectDaysActiveCheck,
    // handleActivePetHostingActiveCheck,
    // handleActiveSelectDaysActiveCheck,
    // handleActivePetOwnerExpectationActiveCheck,
    // multipleActivePetHosting,
  };
};

export default useHandleMultipleActiveCheck;
