export const useAddPetUtils = (
  navigation: any,
  opk: string | null,
  homeData: any,
  onBoarding: boolean,
) => {
  const handleSubmit = async (data: any) => {
    navigation.navigate('AddPetSubmit', {
      opk: opk,
      data: {...homeData, ...data},
      onBoarding: onBoarding,
    });
  };

  return {handleSubmit};
};
