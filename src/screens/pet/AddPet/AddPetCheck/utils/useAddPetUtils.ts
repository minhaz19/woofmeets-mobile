export const useAddPetUtils = (
  navigation: any,
  opk: string | null,
  homeData: any,
) => {
  const handleSubmit = async (data: any) => {
    navigation.navigate('AddPetSubmit', {
      opk: opk,
      data: {...homeData, ...data},
    });
  };

  return {handleSubmit};
};
